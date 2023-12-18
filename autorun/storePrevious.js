const Highlight = require('../model/youtubeHighlight');
const ChannelId = require('../model/ChannelId');
const fetchHighlight = require('../controller/fetchAPI');
const Match=require('../model/premieldgeMatch')
async function storePrevious() {
  const data = await Match.find().sort({fixtureDate:1});

  data.forEach(async (item) => {
    const dateWithoutTimeZone = new Date(item.fixtureDate);
    dateWithoutTimeZone.setHours(dateWithoutTimeZone.getHours() + 2);
    
      checkForHighlights(item);
  });
}

async function checkForHighlights(item) {
  try {
    const publishedAfter = new Date(item.fixtureDate);
    const publishedBefore = new Date(item.fixtureDate);
    publishedAfter.setHours(publishedAfter.getHours() + 2);
    publishedBefore.setHours(publishedBefore.getHours() + 3);
    const publishedAfterWTZ = new Date(publishedAfter).toISOString().replace(/\.\d{3}Z$/, '');
    const publishedBeforeWTZ = new Date(publishedBefore).toISOString().replace(/\.\d{3}Z$/, '');
    const nameChannel = await ChannelId.findOne({ name: item.name });
    const awayChannel = await ChannelId.findOne({ name: item.away });

    if (!nameChannel || !awayChannel) {
      console.log('Channel info not found');
      return;
    }

    const youtubeData = await fetchHighlight(item.name, nameChannel.channelId, item.away, awayChannel.channelId, publishedAfterWTZ,publishedBeforeWTZ);
    if (youtubeData) {
      const data = {
        fixtureId: item.fixtureId,
        name: item.name,
        away: item.away,
        videoUrl: `${youtubeData.id.videoId}`,
        thumbnailsurl: youtubeData.snippet.thumbnails.medium.url,
        thumbnailswidth: youtubeData.snippet.thumbnails.medium.width,
        thumbnailsheight: youtubeData.snippet.thumbnails.medium.height,
        pubAfter: publishedAfter,
      };

      await Highlight.create(data); 
      console.log('Video URL added');
      // job.cancel(); // Cancel the scheduled job as the data is found
    } else {
      console.log('Data not found, retrying in 5 minutes...');
      
    }
  } catch (error) {
    console.error('Error in checkForHighlights:', error);
  }
}

module.exports = { storePrevious };

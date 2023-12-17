const schedule = require('node-schedule');
const Highlight = require('../model/youtubeHighlight');
const ChannelId = require('../model/ChannelId');
const upCommingMatch = require('../model/upcommingMatch');
const fetchHighlight = require('../controller/fetchAPI');

async function autoRun() {
  const data = await upCommingMatch.find();

  data.forEach(async (item) => {
    const dateWithoutTimeZone = new Date(item.fixtureDate);
    dateWithoutTimeZone.setHours(dateWithoutTimeZone.getHours() + 2);
    
    const job = schedule.scheduleJob(dateWithoutTimeZone, function recur() {
      checkForHighlights(item, job);
    });
  });
}

async function checkForHighlights(item, job) {
  try {
    const publishedAfter = new Date(item.fixtureDate);
    const publishedBefore = new Date(item.fixtureDate);
    publishedAfter.setHours(dateWithoutTimeZone.getHours() + 2);
    publishedBefore.setHours(dateWithoutTimeZone.getHours() + 3);
    // const publishedAfter = new Date(item.fixtureDate).toISOString().replace(/\.\d{3}Z$/, '');

    const nameChannel = await ChannelId.findOne({ name: item.name });
    const awayChannel = await ChannelId.findOne({ name: item.away });

    if (!nameChannel || !awayChannel) {
      console.log('Channel info not found');
      return;
    }

    const youtubeData = await fetchHighlight(item.name, nameChannel.channelId, item.away, awayChannel.channelId, publishedAfter,publishedBefore);

    if (youtubeData) {
      const data = {
        fixtureId: item.fixtureId,
        name: item.name,
        away: item.away,
        videoUrl: `https://www.youtube.com/watch?v=${youtubeData.id.videoId}`,
        thumbnailsurl: youtubeData.snippet.thumbnails.medium.url,
        thumbnailswidth: youtubeData.snippet.thumbnails.medium.width,
        thumbnailsheight: youtubeData.snippet.thumbnails.medium.height,
        pubAfter: publishedAfter,
      };

      await Highlight.create(data); // Assuming Highlight is a Mongoose model
      console.log('Video URL added');
      job.cancel(); // Cancel the scheduled job as the data is found
    } else {
      console.log('Data not found, retrying in 5 minutes...');
      // Reschedule the job for 5 minutes later
      job.reschedule('*/5 * * * *');
    }
  } catch (error) {
    console.error('Error in checkForHighlights:', error);
  }
}

module.exports = { autoRun };

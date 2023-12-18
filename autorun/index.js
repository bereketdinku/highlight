const schedule = require('node-schedule');
const Highlight = require('../model/youtubeHighlight');
const ChannelId = require('../model/ChannelId');
const upCommingMatch = require('../model/upcommingMatch');
const fetchHighlight = require('../controller/fetchAPI');
async function autoRun() {
  const data = await upCommingMatch.find().sort({fixtureDate:1});

  data.forEach(async (item) => {
    const dateWithoutTimeZone = new Date(item.fixtureDate);
    dateWithoutTimeZone.setHours(dateWithoutTimeZone.getHours() + 2);
    
    const job = schedule.scheduleJob(dateWithoutTimeZone, function recur() {
      checkForHighlights(item,job);
    });
  });
}

async function checkForHighlights(item,job) {
  let elapsedMinutes = 0;
const totalDuration = 60; 
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
  //  console.log(youtubeData)
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

      await Highlight.create(data); // Assuming Highlight is a Mongoose model
      console.log('Video URL added');
      job.cancel(); // Cancel the scheduled job as the data is found
    } else {
      // console.log('Data not found, retrying in 5 minutes...');
      // elapsedMinutes += 5;
      // if (elapsedMinutes >= totalDuration) {
      //   // Cancel the job after one hour
      //   job.cancel();
      //   console.log('Job completed after one hour.');
      // }else{
      //   //Reschedule the job for 5 minutes later only for one hour
      //   job.reschedule('*/5 * * * *');

      // }
      return null
    }
  } catch (error) {
    console.error('Error in checkForHighlights:', error);
  }
}

module.exports = { autoRun };

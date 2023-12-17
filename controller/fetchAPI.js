const axios=require('axios')
async function fetchHighlight(name,nameChannelId,away,awayChannelId,publishedAfter,publishedBefore){
    // const apiKey = 'AIzaSyD8nkqdfD2YtDzVRGFEMD5KoKs2tE8ysxE';
//   const name = 'everton';
//   const away = 'chelsea';
//   const nameChannelId = 'UCtK4QAczAN2mt2ow_jlGinQ';
//   const awayChannelId = 'UCU2PacFf99vhb3hNiYDmxww';
// console(date)
const apiKey=""
// const dateWithoutTimeZone = new Date(date);

// // Format the date without timezone information
// const publishedAfter = dateWithoutTimeZone.toISOString().replace(/\.\d{3}Z$/, '');
// // const publishedBefore=addTwoHoursToUTC(publishedAfter)
//   const dateAfter = '2023-12-10T14:00:00Z';
// console.log(publishedAfter)
  try {
    // const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=
    //  AIzaSyDuHj6JzHcYNWeYtBdMbuCOlzLFWWJrAlk&
    // q=${name} vs ${away}&type=video&channelId=${nameChannelId}&channelId=${awayChannelId}&order=date&publishedAfter=${publishedAfter}Z&part=snippet&publishedbefore=${publishedBefore}Z`, );
    // console.log('API Response:', response.data);
    if (response.data && response.data.items && response.data.items.length > 0) {
      // console.log('Video ID:', response.data.items[0].id.videoId);
      return response.data.items[0]
    } else {
      console.log('No videos found');
    }
  } catch (error) {
    console.error('Error fetching YouTube videos:', error.message);
  }
}
function addTwoHoursToUTC(dateString) {
  const date = new Date(dateString);
  date.setUTCHours(date.getUTCHours() + 2); // Adds 2 hours in UTC
  return date.toISOString();
}
module.exports=fetchHighlight
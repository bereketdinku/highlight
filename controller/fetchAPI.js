const axios=require('axios')
async function fetchHighlight(name,nameChannelId,away,awayChannelId,date){
    // const apiKey = 'AIzaSyD8nkqdfD2YtDzVRGFEMD5KoKs2tE8ysxE';
//   const name = 'everton';
//   const away = 'chelsea';
//   const nameChannelId = 'UCtK4QAczAN2mt2ow_jlGinQ';
//   const awayChannelId = 'UCU2PacFf99vhb3hNiYDmxww';
// console(date)
const apiKey=""
const dateWithoutTimeZone = new Date(originalDateString);

// Format the date without timezone information
const formattedDate = dateWithoutTimeZone.toISOString().replace(/\.\d{3}Z$/, '');

  const dateAfter = '2023-12-10T14:00:00Z';

  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyD8nkqdfD2YtDzVRGFEMD5KoKs2tE8ysxE&q=${name} vs ${away}&type=video&channelId=${nameChannelId}&channelId=${awayChannelId}&order=date&publishedAfter=${dateAfter}`, );
    // console.log('API Response:', response.data);
    if (response.data && response.data.items && response.data.items.length > 0) {
      console.log('Video ID:', response.data.items[0].id.videoId);
    } else {
      console.log('No videos found');
    }
  } catch (error) {
    console.error('Error fetching YouTube videos:', error.message);
  }
}
module.exports=fetchHighlight
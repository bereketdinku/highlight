const axios=require('axios')
async function fetchHighlight(name,nameChannelId,away,awayChannelId,publishedAfter,publishedBefore){
    

console.log(publishedAfter)
  try {
    // const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDuHj6JzHcYNWeYtBdMbuCOlzLFWWJrAlk&q=${name} vs ${away}&type=video&channelId=${nameChannelId}&channelId=${awayChannelId}&order=date&part=snippet&publishedAfter=${publishedAfter}Z&publishedBefore=${publishedBefore}Z`, );
    if (response.data && response.data.items && response.data.items.length > 0) {
      console.log('Video ID:', response.data.items[0].id.videoId);
      return response.data.items[0]
    } else {
      console.log('No videos found');
      return null
    }
  } catch (error) {
    console.error('Error fetching YouTube videos:', error.message);
  }
}

module.exports=fetchHighlight
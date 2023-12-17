const fetchHighlight=require('./fetchAPI')
const Highlight=require('../model/youtubeHighlight')
const cron = require('node-cron');
async function storeHighlight(name,nameChannelId,away,awayChannelId,date){
    const videoId=await fetchHighlight(name,nameChannelId,away,awayChannelId,date)
    const newDate = new Date(pubAfter);
    if(!videoId){
        cron.schedule('*/5 * * * *', fetchHighlight(name,nameChannelId,away,awayChannelId,date));
    }else{
        const data={
            fictureId:fictureId,
            name:name,
            away:away,
            videoUrl:`https://www.youtube.com/watch?v=${videoId}`,
            pubAfter:pubAfter,
            pubBefore:pubBefore
        }
       Highlight(data).save()
    }
   
}
module.exports={storeHighlight}
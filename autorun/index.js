const schedule = require('node-schedule');
const storeHighlight=require('../controller/storeVideoUrl')
const ChannelId=require('../model/ChannelId')
const Match=require('../model/premieldgeMatch')
const Highlight=require('../model/youtubeHighlight')
const fetchHighlight=require('../controller/fetchAPI')
async function autoRun(fixtureId){
    const data=await Match.findOne({fixtureId})
    const name=data.name
    const date=data.fixtureDate
    // console.log(name)
    const away=data.away
    // const nameChannel=await ChannelId.findOne({name:name});
    // const nameChannelId=nameChannel.ChannelId;
    // console.log(nameChannel)
    // const awayChannel=ChannelId.find({name:away})
    // const awayChannelId=awayChannel.ChannelId
    try {
        const name = 'Everton'; // Replace with the desired name
        const nameChannel = await ChannelId.findOne({ name: name });
        const awayChannel = await ChannelId.findOne({ name: away });
        if (nameChannel && awayChannel) {
            const videoId=await fetchHighlight(name,nameChannel.channelId,away,awayChannel.channelId,date)
               console.log(videoId)
          console.log(nameChannel.channelId ,awayChannel.channelId);
        } else {
          // No document found with the specified name
          console.log('No channel found with the name:', name);
        }
      } catch (error) {
        // Handle any errors that occurred during the findOne operation
        console.error('Error:', error.message);
      }
    // const videoId=await fetchHighlight(data.name,nameChannelId,data.away,awayChannelId,date)
//    console.log(videoId)
    //     if(!videoId){
    //         cron.schedule('*/5 * * * *', fetchHighlight(name,nameChannelId,away,awayChannelId,date));
    //     }else{
    //         const data={
    //             fictureId:fixtureId,
    //             name:name,
    //             away:away,
    //             videoUrl:`https://www.youtube.com/watch?v=${videoId}`,
    //             pubAfter:pubAfter,
    //             pubBefore:pubBefore
    //         }
    //        Highlight(data).save()
    //     }
    //set schedule time
    // const originalDate = new Date(`${pubAfter}`);
    // const newDate = new Date(originalDate);
    // //send to storeHighlight function
    // storeHighlight(name,nameChannelId,away,awayChannelId)
    // newDate.setMinutes(originalDate.getMinutes() + 20);
    // const job = schedule.scheduleJob(newDate,storeHighlight );
}
const store=async (req,res)=>{
    const {fixtureId}=req.params;
    const data=await Match.findOne({fixtureId})
    const nameChannel=ChannelId.findOne({name:data.name});
    const nameChannelId=nameChannel.ChannelId;
    const awayChannel=ChannelId.findOne({name:data.away})
    const awayChannelId=awayChannel.ChannelId
    storeHighlight(data.name,nameChannelId,data.away,awayChannelId,data.fixtureDate
        )
}
module.exports={autoRun}
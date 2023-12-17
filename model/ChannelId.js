const mongoose=require('mongoose')
const channelIdSchema= mongoose.Schema({
    name:{
        type:String
    },
    channelId:{
        type:String
    }
})
module.exports=mongoose.model('channelId',channelIdSchema)
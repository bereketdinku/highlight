const mongoose=require('mongoose')
const highlightSchema=mongoose.Schema({
    name:{
        type:String
    },
    away:{
        type:String
    },
    fictureId:{
        type:String
    },
    videoUrl:{
        type:String
    },
    pubBefore:{
        type:Date
    },
    pubAfter:{
        type:Date
    }
})
module.exports=mongoose.model('highlight',highlightSchema)
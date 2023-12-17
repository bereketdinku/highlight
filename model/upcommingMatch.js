const mongoose=require('mongoose')
const upcommingMatchSchema=mongoose.Schema({
    name:{
        type:String
    },
    away:{
        type:String
    },
    fixtureId:{
        type:String
    },
    fixtureDate:{
        type:Date
    }
})
module.exports=mongoose.model('upCommingmatch',upcommingMatchSchema)
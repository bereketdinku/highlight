const mongoose=require('mongoose')
const matchSchema=mongoose.Schema({
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
module.exports=mongoose.model('match',matchSchema)
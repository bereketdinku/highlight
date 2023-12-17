const ChannelId=require('../model/ChannelId')
const Highlight=require('../model/youtubeHighlight')
const { response } = require('express')
const index=async(req,res)=>{
    const{name,away,pubAfter,pubBefore}=req.params
    Highlight.findOne({name,away,pubAfter}).sort({pubBefore:-1}).then((response)=>{
        res.json({response})
    }).catch((error)=>{
        res.json({"message":error})
    })
}


module.exports={index}
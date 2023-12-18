const ChannelId=require('../model/ChannelId')
const Highlight=require('../model/youtubeHighlight')
const { response } = require('express')
const index=async(req,res)=>{
    const{fixtureId}=req.params
    Highlight.findOne({fixtureId}).then((response)=>{
        res.json({response})
    }).catch((error)=>{
        res.json({"message":error})
    })
}


module.exports={index}
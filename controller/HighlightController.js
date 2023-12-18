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

const fetch=async(req,res)=>{
    const{fixtureId}=req.params
    Highlight.find().sort({fixtureId:-1}).then((response)=>{
        res.json({response})
    }).catch((error)=>{
        res.json({"message":error})
    })
}
module.exports={index}
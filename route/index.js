const express = require("express");
const router = express.Router();
const highlightSearch=require('../controller/HighlightController').index;
const channelIdStore=require('../controller/ChannelIdController').store;
router.post('/highlight',highlightSearch)
router.post('/channelIdStore',channelIdStore)
module.exports=router
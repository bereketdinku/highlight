const express = require("express");
const router = express.Router();
const highlightSearch=require('../controller/HighlightController').index;
router.post('/highlight',highlightSearch)
module.exports=router
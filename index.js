const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const schedule = require('node-schedule');
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(cors());
const router=require('./route/index');
const { autoRun } = require("./autorun");
const { extractClubInfo, storeChannel } = require("./controller/ChannelIdController");
const { channelUrls } = require("./const");
const { storematch, upcommingMatchApi } = require("./match/matchList");
const { matchApi } = require("./match/fetchMatchApi");
const { fetchHighlight } = require("./controller/fetchAPI");
const { storePrevious } = require("./autorun/storePrevious");
mongoose.connect("mongodb+srv://bereketdinku:beki1234@cluster0.69ripac.mongodb.net/youtube",{ useNewUrlParser: true, serverSelectionTimeoutMS: 30000 });
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Database Connection Established");
});
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
app.use("/api/highlight", router);
//to extract club
// extractClubInfo(channelUrls)

// to club with channelId
// storeChannel()

//to store match
// matchApi()

// to run upcomming match highlight
// autoRun()

//to run for previous match highlight
// storePrevious()
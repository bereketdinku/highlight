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
const { storematch } = require("./match/matchList");
const { matchApi } = require("./match/fetchMatchApi");
const { fetchHighlight } = require("./controller/fetchAPI");
mongoose.connect("mongodb+srv://bereketdinku:beki1234@cluster0.69ripac.mongodb.net/youtube",{ useNewUrlParser: true, serverSelectionTimeoutMS: 30000 });
const db = mongoose.connection;
// db.currentOp()
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
// extractClubInfo(channelUrls)
// storeChannel()
// matchApi()
// fetchHighlight('2024-02-17T15:00:00.000+00:00')
 
autoRun(1035327)
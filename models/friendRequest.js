const mongoose = require('mongoose')
const moment = require("moment-timezone");
const timeIndia = moment.tz(Date.now(), "Asia/Colombo");
const friendRequest = mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["Pending", "Accept", "Cancel"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: timeIndia,
  },
  updatedAt: {
    type: Date,
    default: timeIndia,
  }
});

const FriendRequest = mongoose.model("FriendRequest",friendRequest)

module.exports = FriendRequest
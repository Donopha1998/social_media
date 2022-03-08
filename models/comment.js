const mongoose = require("mongoose");
const moment = require("moment-timezone");
const timeIndia = moment.tz(Date.now(), "Asia/Colombo")

const comment = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  commentor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Posts",
  },
  createdAt: {
    type: Date,
    default: timeIndia,
  },
  updatedAt: {
    type: Date,
    default: timeIndia,
  },
});

const Comment = mongoose.model("Comment", comment);

module.exports = Comment;

const mongoose = require('mongoose')
const moment = require("moment-timezone");
const timeIndia = moment.tz(Date.now(), "Asia/Colombo");

const postsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  post: {
    type: String,
    required: true,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
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


const Posts = mongoose.model('Posts',postsSchema)


module.exports =Posts
const mongoose = require("mongoose")
const moment = require("moment-timezone");
const timeIndia = moment.tz(Date.now(), "Asia/Colombo");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  createdAt: {
    type: Date,
    default: timeIndia,
  },
  updatedAt: {
    type: Date,
    default: timeIndia,
  },
});

const User=mongoose.model('User',userSchema)

module.exports = User
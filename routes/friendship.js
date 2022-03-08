const express = require('express')
const router = express.Router()
const { createFriend, acceptFriend, rejectFriend, getAllFriendRequestReceive, getAllFriendRequestSent, listOfFriends } = require("../controllers/friend_request");
const protect = require('../middleware/auth');



router.route('/create').post(protect,createFriend)
router.route('/accept').patch(protect,acceptFriend)
router.route('/reject').patch(protect,rejectFriend)
router.route('/allReceive').get(protect,getAllFriendRequestReceive)
router.route("/allSent").get(protect, getAllFriendRequestSent);
router.route("/allFriends").get(protect,listOfFriends)
module.exports = router

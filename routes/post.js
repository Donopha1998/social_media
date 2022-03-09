const express = require('express')

const router = express.Router()
const {createPost, editPost, deletePost, getPosts, getUserPosts, likePost, dislikePost} = require("../controllers/post_controller");
const protect = require('../middleware/auth');

router.route('/create').post(protect,createPost)
router.route('/edit').put(protect,editPost)
router.route('/like').patch(protect,likePost)
router.route("/dislike").patch(protect, dislikePost);
router.route('/delete').delete(protect,deletePost)
router.route('/all').get(protect,getPosts)
router.route('/userPosts').get(protect,getUserPosts)
module.exports=router
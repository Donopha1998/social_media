const express = require("express");
const {createComment, editComment, deleteComment, getComments, getUserComments }= require("../controllers/comment");
const protect = require("../middleware/auth");
const router = express.Router();


router.route("/create").post(protect,createComment)
router.route('/edit').put(protect,editComment)
router.route('/delete').delete(protect,deleteComment)
router.route('/all').get(protect,getComments)
router.route('/userComment').get(protect,getUserComments)
module.exports = router;

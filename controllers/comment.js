const Comment = require("../models/comment")



// @desc   create a comment
// @route   POST api/v1/comment/create
// @access  Private
const createComment = async(req,res)=>{
    try {
         const createComment = Comment.create({
             commentor:req.user.id,
             comment:req.body.comment,
             post:req.query.postId
         })
         res.status(200).json({
             commentor:req.user.name,
             comment:req.body.comment,
             msg:"comment successfully submitted"
         })
    } catch (error) {
        console.log(error)
        res.status(400).json({"msg":error.message})
    }
    
   
}

// @desc    edit a comment
// @route   PUT api/v1/comment/edit
// @access  Private
const editComment = async (req, res) => {
  const userId = req.user.id;
  const commentId = req.query.commentId;
  const newComment = req.body.comment;
  try {
    const comment = await Comment.findOne({
      $and: [{ commentor: userId }, { _id: commentId }],
    });
    console.log(comment)
    comment.comment = newComment || comment.comment
    comment.save();
    res.status(201).json({
      post: req.body.comment,
      msg: "comment was edited successfully",
    });
  } catch (error) {
      console.log(error)
    res.status(500).json({ 'msg': error.message});
  }
};

// @desc   delete a comment
// @route   DELETE api/v1/comment/delete
// @access  Private
const deleteComment = async (req, res) => {
  const commentId = req.query.commentId;
  const userId = req.user.id;
  try {
    const post = await Comment.deleteOne({
      $and: [{ commentor: userId }, { _id: commentId }],
    });
    res.status(200).json({ msg: "comment deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "you are not allowed to do that" });
  }
};

// @desc   list of friends
// @route   GET api/v1/friend/all
// @access  Private
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({ data: comments });
  } catch (error) {
    res.status(400).json({ msg: "comments do not exist" });
  }
};

// @desc   get user comments
// @route   GET api/v1/comment/userComment
// @access  Private
const getUserComments = async (req, res) => {
  try {
    const comments = await Comment.find({commentor:req.user.id}).select('-commentor').populate('post','post')
    res.status(200).json({ data: comments });
  } catch (error) {
    res.status(400).json({ msg: "comments do not exist" });
  }
};
module.exports ={createComment,editComment,deleteComment,getComments,getUserComments}
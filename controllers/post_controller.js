const Posts = require("../models/posts")

// @desc   create post
// @route   GET api/v1/post/create
// @access  Private
const createPost = async(req,res)=>{

const user = req.user.id
    try {
        const post =await Posts.create({
            user,
            post:req.body.post
         })
         res.status(201).json({
           id:post.id,
           post: req.body.post,
           user,
           msg:'post creation success'
         });
    } catch (error) {
        console.log(error)
        res.status(500).send('post creation failed')
    }
}

// @desc    edit post
// @route   PUT api/v1/post/edit
// @access  Private
const editPost = async (req, res) => {
 const userId = req.user.id
 const postId = req.query.id
 const newPost = req.body.post
  try {
    const post = await Posts.findOne({$and:[{user:userId},{_id:postId}]})
    post.post = newPost
    post.save()
    res.status(201).json({
      post: req.body.post,
      msg:'post was edited successfully'
    });
  } catch (error) {
    res.status(500).json({msg:"post creation failed"});
  }
};

// @desc   delete post
// @route   DELETE api/v1/post/delete
// @access  Private
const deletePost = async(req,res)=>{
    const postId = req.query.postId
    const userId = req.user.id
  try {
    const post = await Posts.deleteOne({$and:[{_id:postId},{user:userId}]})
    res.status(200).json({msg:'post deleted successfully'})
  } catch (error) {
    console.log(error)
    res.status(400).json({msg:'you are not allowed to do that'})
  }
}

// @desc    get all the posts
// @route   GET api/v1/post/all
// @access  Private
const getPosts = async(req,res)=>{
  try {
    const posts = await Posts.find()
    res.status(200).json({data:posts})
  } catch (error) {
    res.status(400).json({msg:'post does not existed'})
  }
}

// @desc   get user posts
// @route   GET api/v1/post/userPosts
// @access  Private
const getUserPosts = async (req, res) => {
  try {
    const posts = await Posts.find({user:req.user.id});
    console.log(req.body.id)
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(400).json({ msg: "post does not existed" });
  }
};

// @desc    like a post
// @route   PATCH api/v1/post/like
// @access  Private
const likePost = async(req,res)=>{
  const status= req.body.status
 const post = await Posts.findOne({ _id: req.query.postId });
try {
   if(status==1){
     post.likes +=1
      post.save()
     res.status(200).json({ msg: "liked success" });
   }  
  
else{
     res.status(400).json({msg:'like updation failed'})
 }
} catch (error) {
  res.status(500).json({msg:error.message})
}}


// @desc    dislike a post
// @route   PATCH api/v1/post/dislike
// @access  Private
const dislikePost=async(req,res)=>{
  const status= req.body.status
 const post = await Posts.findOne({ _id: req.query.postId });
try {
   if (status == 0) {
     post.likes === 0 ? post.likes === 0 : (post.likes -= 1);
     post.save();
     res.status(200).json({ msg: "disliked success" });
   } else {
     res.status(400).json({ msg: "api failed" });
   }
} catch (error) {
  res.status(400).json({msg:error.message})
}}

  


module.exports ={ createPost,editPost,likePost,deletePost,getPosts,getUserPosts,likePost,dislikePost}
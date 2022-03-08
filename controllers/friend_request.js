const res = require('express/lib/response');
const FriendRequest = require('../models/friendRequest')
const User = require('../models/user')



// @desc    create a user 
// @route   POST api/v1/friend/create
// @access  Private
const createFriend =async(req,res)=>{

    const {  recipientId } = req.query;
    const check = await FriendRequest.findOne({requester:req.user.id,recipient:recipientId})
  if(check){
            res.status(400).json('you already sent a friend request')
        }
         else{
  try {
      const user = await FriendRequest.create({
          requester: req.user.id,
          recipient: recipientId,
        });
    res.status(200).json({msg:"friend request was sent"})}
    catch (error) {
        console.log(error)
         res.status(400).json({ msg: "friend request sent failed" }); 
    }
}
}

// @desc    accept friend request
// @route   PATCH /api/v1/friend/accept
// @access  Private
const acceptFriend = async (req, res) => {
  const userId  = req.user.id;

  const {status } = req.body
  const friendRequest = await FriendRequest.findById(req.query.requestId)
  
 console.log(friendRequest)
 
 if (friendRequest && status) {
   try{
    
    if(status ==1){
          friendRequest.status ='Accept'
          await friendRequest.save()
        res.status(200).json("friend request accepted")
     }
     else{
       res.status(400).json({"msg":'friend updation failed'})
     }
    
  }
  
  catch (error) {
    console.log(error)
      res.status(400).send(error)
  }}
  else{
    res.status(400).json({"msg":"friend request donot existed"})
  }
}

// @desc    reject a friend request
// @route   PATCH /api/v1/friend/reject
// @access  Private
  const rejectFriend = async (req, res) => {
  const userId  = req.user.id;

  const {status } = req.body
  const friendRequest = await FriendRequest.findById(req.query.requestId);

 if (friendRequest && status) {
   try{
    if(status ==0){
         friendRequest.status = 'Cancel'
         friendRequest.save()  
         res.status(200).json("friend request cancelled")
    }
  else{
    res.status(400).json({"msg":"friend request updation failed"})
  }}
 catch (error) {
    console.log(error)
      res.status(400).json({'msg':error.message})
  }}}

// @desc    Get all the friend request receive
// @route   GET /api/v1/friend/allReceive
// @access  Private
const getAllFriendRequestReceive =async(req,res)=>{
  const userId = req.user.id
  console.log(userId)
    try {
          const requests =await FriendRequest.find({recipient:userId})
          console.log(requests)
          if(requests){
              res.status(200).json(requests);
          }
         else{
             res.status(400).json({msg:'friendRequest does not exist'})
         }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
  
}

// @desc    Get all the friend request accept
// @route   GET /api/v1/friend/allSent
// @access  Private
const getAllFriendRequestSent = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const requests = await FriendRequest.find({
      requester: userId,
      });
    console.log(requests);
    if (requests) {
      res.status(200).json(requests);
    } else {
      res.status(400).json({ msg: "friendRequest does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// @desc   list of friends
// @route   GET api/v1/friend/allFriends
// @access  Private
const listOfFriends = async(req,res)=>{
 const userId = req.user.id;
 console.log(userId);
 try {
   const requests = await FriendRequest.find({
    $and:[{$or:[{recipient:userId},{requester:userId}]},{status:'Accept'}]
   });
   console.log(requests);
   if (requests) {
     res.status(200).json(requests);
   } else {
     res.status(400).json({ msg: "friendRequest does not exist" });
   }
 } catch (error) {
   console.log(error);
   res.status(400).json({ error: error.message });
 }
}
module.exports ={ createFriend,acceptFriend,rejectFriend,getAllFriendRequestReceive,getAllFriendRequestSent,listOfFriends}
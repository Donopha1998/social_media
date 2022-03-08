const User = require('../models/user')
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/token');


// @desc   create a user
// @route   POST api/v1/user/create
// @access  Public

const createUser = async(req,res)=>{
try {
const { name, email, password } = req.body;
const existUser =await User.findOne({email:email})

if(existUser){
    res.status(400).json({error:'user already existed'})
}
else{
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashed,
      
    })

res.status(201).json({
id:user._id,
  name,
  email,
  password: hashed,
  token: generateToken(user._id)
});

}
} catch (error) {
    
    res.status(401).send('invalid user data')
    
}
}
// @desc   login user
// @route   POST api/v1/user/login
// @access  Public

const login =async(req,res)=>{

    const {email,password}=req.body
    const user =await User.findOne({email})
  console.log(req.user)
    if((user && await bcrypt.compare(password,user.password))){
        res.status(200).json({
            id:user._id,
            email:user.email,
            name:user.name,
            token:generateToken(user._id)})
    }
    else{
        res.status(400).send('invalid email or password')
    }
}
// @desc   update a user
// @route   PUT api/v1/user/update
// @access  Private

const updateUser = async(req,res)=>{


    const user = await User.findById(req.user.id)
    console.log(req.user.id)
    if(user){
      user.name= req.body.name|| user.name,
      user.email = req.body.email || user.email 
      const updatedUser = await user.save()
    
     res.status(200).json({
       _id: updatedUser._id,
       name: updatedUser.name,
       email: updatedUser.email,
       token: generateToken(updatedUser._id),
    })}
    else{
      res.status(400).json('user updation failed')
    }
  }
// @desc   get all the users
// @route   GET api/v1/user/all
// @access  Private


const getAllUsers = async(req,res)=>{
  try {
    
  const users = await User.find();
  res.status(200).json(users);
  } catch (error) {
    res.status(400).json('users do not exist')
  }

}




module.exports ={createUser,login,getAllUsers,updateUser,getAllUsers}
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const userRouter=require('./routes/user')
const postRouter = require('./routes/post')
const friendshipRouter = require('./routes/friendship')
const commentRouter = require('./routes/comment')

dotenv.config()
const port = process.env.PORT || 3000
connectDB();
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('doing this things for fun')
})
app.use('/api/v1/user',userRouter)
app.use('/api/v1/post',postRouter)
app.use('/api/v1/friend',friendshipRouter)
app.use('/api/v1/comment',commentRouter)


app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})


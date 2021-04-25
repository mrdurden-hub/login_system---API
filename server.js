require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const admRouter = require('./routes/admRoter')
const userRouter = require('./routes/userRouter')
const app = express()

// db connection
mongoose.connect(
    process.env.URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
})

// User Router
app.use('/user', express.json(), userRouter)

// Admin Router
app.use('/admin', express.json(), admRouter)

// server listening at the port
app.listen(process.env.PORT, () => {
    console.log('Server Running')
})
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const admRouter = require('./routes/admRoter')
const userRouter = require('./routes/userRouter')
const app = express()
const cors = require('cors')

var whitelist = ['http://localhost:3000']

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// db connection
mongoose.connect(
    process.env.URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(()=>{
    console.log('database connected')
    app.emit('connected')
}).catch(e => {
    console.log(e)
})

// CORS Options
app.use(cors(corsOptions))

// User Router
app.use('/user', express.json(), userRouter)

// Admin Router
app.use('/admin', express.json(), admRouter)

// server listening at the port
app.on('connected', () => {
    app.listen(process.env.PORT, ()=>{
        console.log('server Running in http://localhost:3000')
    })
})
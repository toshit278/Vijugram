// JavaScript source code
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {MONGOURI} = require('./config/keys')
const PORT = process.env.PORT || 5000
require("dotenv").config()

mongoose.connect(MONGOURI)

// mongoose.connect(MONGOURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology:true
// })
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongo")
})
mongoose.connection.on('error', (err) => {
    console.log("error connection ", err)
})


require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
//bartaskar

// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client/build'))
//     const path =require('path')
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

const path =require('path')
app.use(express.static(path.join(__dirname,"client","build")))

app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });

app.listen(PORT, () => {
    console.log("server is running on",PORT)
})

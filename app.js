const dotenv = require("dotenv")
const express = require('express')
const app = express()

// import model and schema
const user = require('./models/userschema')

// secure file path
dotenv.config({path:'./config.env'})


const PORT = process.env.PORT;

// import db connection
require('./db/conn')
app.use(express.json())
app.use(require('./router/auth'))








// app.get('/about',(req,res)=>{
//     res.send("about page")
// })

app.get('/contact',(req,res)=>{
    // res.cookie("hello1","ji")
    res.send("contact page")
})
app.get('/singup',(req,res)=>{
    res.send("singup page")
})

// app.get('*',(req,res)=>{
//     res.send(" page not found")
// })


app.listen(PORT,()=>{
    console.log(`server run on ${PORT}`)
})
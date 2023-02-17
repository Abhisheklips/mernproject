const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
// import for hashing password
const bcrypt = require('bcryptjs')

const Authenticat = require("../middleware/Authenticat")

// import db
require('../db/conn')
const user = require('../models/userschema')


router.get('/', (req, res) => {
    res.send("home page by router")
})

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body
    //onsole.log(req.body)
    //res.send("hello")

    // require filed validation
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.json({ Error: "plz fill info" })
    }

    try {

        // check email in db
        const userexits = await user.findOne({ email: email })

        if (userexits) {
            return res.status(404).json({ Error: "email exits" })

        } else if (password != cpassword) {
            return res.status(404).json({ Error: "password not match" })

        } else {
            const data = new user({ name, email, phone, work, password, cpassword })

            // save data in db
            await data.save()

            res.json({ messsage: "data save" })

        }


    } catch (Error) {
        console.log(Error)
    }

})


// login 
router.post('/signin', async (req, res) => {

    try {
        const { email, password } = req.body

        // require filed validation
        if (!email || !password) {
            return res.json({ Error: "plz fill info" })
        }

        // check db and user email
        const userlogin = await user.findOne({ email: email })


        if (userlogin) 
        {
            // check user and db password
            const ismatch = await bcrypt.compare(password, userlogin.password)
           
            // call token 
            const token = await userlogin.generateAuthtoken()
            // console.log(token) 

            // cookies add 
            res.cookie("myabhi",token,{
                // expoire in set 30days in milisecond 
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            })

            

            if (!ismatch) 
            {
                return res.status(404).json({ Error: "user error pass" })

            } else 
            {
                return res.status(200).json({ messsage: "sigin successfully" })

            }


        } else
         {
            return res.status(200).json({ Error: "user error email" })

        }

    } catch {
        console.log(Error)

    }


});


router.get('/about', Authenticat , (req,res)=>{
    res.send(req.rootusr)

})







module.exports = router;

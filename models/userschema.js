const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// db table row/doument define
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    thokens:[
        {
            token:{
                type:String,
                required:true
         
            }
        }
    ]
    
    
    
})

// create middlware for password hash in db
userschema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await  bcrypt.hash(this.cpassword, 12)

    }
    next()
})


// define token
userschema.methods.generateAuthtoken = async function(){

    try{
        // generate token
        let tokenabhi = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        // add token in schema feild
        this.thokens = this.thokens.concat({token:tokenabhi})
        // save token in db
        await this.save()
        return tokenabhi;
    }catch(error){
         console.log(error)
    }
}


// create table/collection 
const user = mongoose.model('USER',userschema)
module.exports = user;
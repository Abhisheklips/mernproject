
const mongoose = require('mongoose')

//db connection
const db = process.env.DATABASE;

mongoose.set('strictQuery', false);
mongoose.connect(db).then(()=>{
    console.log("conected");
}).catch((e)=> console.log('not connected'));

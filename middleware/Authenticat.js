const jwt = require('jsonwebtoken')
const user = require('../models/userschema')

const Authenticat = async (req, res, next) => {

    try {

        //get token
        const token = req.cookies.myabhi;
        
        //verify token
        const veriytoken = jwt.verify(token, process.env.SECRET_KEY);
        // if verify success which user token get
        const rootusr = await user.findOne({ _id: veriytoken._id, "thokens.token": token })
        // if no user get error
        if (!rootusr) {
            throw new Error('user not found')

        }

        req.token = token;
        req.rootusr = rootusr;
        req.userID = rootusr._id;

        next();


    } catch (e) {
        res.status(401).send('unnauthenticat ');
        //console.log(e)
    }

}

module.exports = Authenticat;
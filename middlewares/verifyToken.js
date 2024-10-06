const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const User = require('../models/User')

const verifyToken = async (req,res,next)=>{
    const Auth = req.headers['Authorization'] || req.headers['authorization']

    if (!Auth)
    {
        next(new AppError("token is required!" , 401))
    }
    const token = Auth.split(' ')[1]
    try{
        const decode = jwt.verify(token , process.env.SECRETKEY)
        const currentUser = await User.findById(decode.id);
        if(!currentUser){
            return next(new AppError('user is not exist') , 401)
        }

        req.user = currentUser
        next()
    }
    catch{
        next(new AppError("invalid token" , 401))
    }

}

module.exports = verifyToken
const User = require('../models/User')
const Catchasync = require('../utils/Catchasync')
const AppError = require('../utils/AppError')
const GenerateToken = require('../utils/GenerateToken')

const signup = Catchasync(async(req,res,next)=>{
    const {username,email,password} = req.body
    const user = await User.findOne({email})
    if(user)
    {
        return next(new AppError('this user already exist please login',401))
    }
    
    const newuser = new User({
        username,
        password,
        email
    })
    const token = GenerateToken({email : newuser.email , id : newuser._id})
    newuser.token = token

    await newuser.save({runValidators : true})
    res.status(200).json({
        success : true,
        msg : "user signed up successfully",
        newuser
    })
})

const login = Catchasync(async(req,res,next)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user)
    {
        return next(new AppError('user not found! ,please sign up' , 401))
    }
    const pass = await user.checkpassword(password);
    if(!pass){
        return next(new AppError('Email or Password are invalid',401))
    }
    user.token = GenerateToken({email : user.email , id : user._id})
    await user.save()
    return res.status(200).json({
        success : true,
        msg : "logged in successfully",
        token : user.token
    })
})

module.exports = {
    signup,
    login
}
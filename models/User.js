 const mongoose = require('mongoose')
 const {isEmail} = require('validator')
 const bcrypt = require('bcrypt')
 const AppError = require('../utils/AppError')
 const userSchema = new mongoose.Schema({
    username : {
        type : String,
        trim : true,
        required : [true,'please enter a username'],
        minlength : 3,
        maxlength : 40
    },

    email : {
        type : String,
        trim : true,
        required : [true,'please enter a email'],
        unique : true,
        validate : [isEmail, 'Email should have a valid syntax e.g: example@example.com']
    },

    password : {
        type : String,
        required : [true,'please enter a password'],
        minlength : 6,
    },

    phone : {
        type : String
    },

    address: {
        type: String,
        maxlength: 100
    },

    token : {
        type : String
    },

    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    isActive: {
        type: Boolean,
        default: true
    },

 })

 userSchema.pre("save" , async function (next){
    if(!this.isModified('password'))
    {
       return next()
    }
    try{
        const hashedpass = await bcrypt.hash(this.password , 12)
        this.password = hashedpass
        next()
    }catch(err){
        next(err)
    }
 })

 userSchema.methods.checkpassword = async function(data) {
    return await bcrypt.compare(data , this.password);
 }

 module.exports = mongoose.model('user',userSchema)
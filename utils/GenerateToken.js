const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const Catchasync = require('../utils/Catchasync')

const GenerateToken = (payloud)=>{
    const token = jwt.sign(payloud,process.env.SECRETKEY,{expiresIn : '5d'})
    return token
}

module.exports = GenerateToken
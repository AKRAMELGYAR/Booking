const AppError = require('../utils/AppError')

const verifyRoles = function(...roles){
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return next(new AppError('you do not have permition to do this action',401))
        }
    next()
    }
}

module.exports = verifyRoles

//http-status-codes
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
async function authmiddleware(req,res,next){
    const autheader = req.headers.authorization;

    if(!autheader || !autheader.startsWith('Bearer')){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Authentication invalid"})
    }

    const tokens = autheader.split(' ')[1]

    try {
        const {username,userid} = jwt.verify(tokens,process.env.JWT_SECRET)
      req.user = {username,userid}
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Authentication invalid"})
    }
}
module.exports = authmiddleware;
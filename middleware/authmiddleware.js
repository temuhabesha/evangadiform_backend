//http-status-codes
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
async function authmiddleware(req,res,next){
    const autheader = req.headers.authorization;

    if(!autheader || !autheader.startsWith('Bearer')){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Authentication invalid"})
    }

    const tokens = autheader.split(' ')[1]
    console.log(autheader)
    console.log(tokens)

    try {
        const {username,userid} = jwt.verify(tokens,"secret")
      req.user = {username,userid}
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Authentication invalid"})
    }
}
module.exports = authmiddleware;
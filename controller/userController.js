//importing module starting point
//importing bcrypt for encrypt the password
const bcrypt = require('bcrypt')
//http-status-codes
const {StatusCodes} = require('http-status-codes')
//database connection importing
const dbconnection= require('../db/dbconfig')
//importing the module ending point


//the starting point of registretion function
async function register(req,res){
    const {username,firstname,lastname,email,password}=req.body;
if(!username || !firstname || !lastname || !email ||!password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'please provide all required information'})
    }
 try {

    const [user] = await dbconnection.query('SELECT username,userid FROM users WHERE username = ? or email = ?',[username,email])
 
    if(user.length>0){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already registered"})
    }

    if(password.length<8){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"the password must be at list 8 charachters"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    await dbconnection.query('INSERT INTO users (username,firstname,lastname,email,password) VALUES(?,?,?,?,?)',[username,firstname,lastname,email,hashedPassword])
    return res.status(StatusCodes.CREATED).json({msg:"user registered successfully"})


 } catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"somthing went wrong"})
 }
}
//the register function ending point



async function login(req,res){
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please enter all required fields"})
    }
 try {
    const [user] = await dbconnection.query('SELECT username,userid,password FROM users where email=?',[email])

    if(user.length==0){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"})
    }
   //compare the password
   const isMach = await bcrypt.compare(password,user[0].password)

   if(!isMach){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"})
   }
   return res.json({user:user[0].password})

 } catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"somthing went wrong"})
 }
}
async function checkuser(req,res){
    res.send('checkuser')
}
module.exports ={register,login,checkuser}
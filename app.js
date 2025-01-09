//importing the module starting point
const express = require('express')
const userRouter = require('./routs/userRout')
const questionRouters = require('./routs/questionRout')
const dbconnection = require('./db/dbconfig')
// authmiddle ware
const authmiddleware = require('./middleware/authmiddleware')
const cors = require('cors')
//importing the modle ending point

const app = express();
const PORT = 5500

//middle ware starting point
//cors middle ware
app.use(cors())
//json middle ware to extract json data
app.use(express.json())


//user routes middleware
app.use('/api/user',userRouter)
//question routes middleware
app.use('/api/questions',authmiddleware,questionRouters)
//middleware ending point

//app listning starting point
app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`listen on port number ${PORT}`)
    }
})


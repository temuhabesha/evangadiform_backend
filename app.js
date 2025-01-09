//importing the module starting point
const express = require('express')
const userRouter = require('./routs/userRout')
const dbconnection = require('./db/dbconfig')
//importing the modle ending point

const app = express();
const PORT = 5500

//middle ware starting point
//json middle ware to extract json data
app.use(express.json())

//user routes middleware
app.use('/api/user',userRouter)
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


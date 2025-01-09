//module importing starting point
const mysql = require('mysql2')
const dotenv = require('dotenv').config()
//module importing ending point

const dbconnection = mysql.createConnection({
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    host:'localhost'
})

dbconnection.connect((err)=>{
    if(err){
        console.log(err.message)
    }
    else{
        console.log('the database is connected successfully')
    }
})

module.exports = dbconnection.promise();
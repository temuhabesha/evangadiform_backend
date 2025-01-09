//module importing starting point
const mysql = require('mysql2')
//module importing ending point

const dbconnection = mysql.createConnection({
    user:'evangadiadmin',
    database:'evangadi_db',
    password:'1234',
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
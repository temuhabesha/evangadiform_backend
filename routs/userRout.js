//importing module starting point
const express = require('express')


//user controllers

const {register,login,checkuser} = require('../controller/userController')

const router = express.Router()
router.post('/register',register)
router.post('/login',login)
router.get('/check',checkuser )

module.exports=router
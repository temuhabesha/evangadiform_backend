//importing module starting point
const express = require('express')
// authmiddle ware
const authmiddleware = require('../middleware/authmiddleware')


//user controllers

const {register,login,checkuser} = require('../controller/userController')

const router = express.Router()
router.post('/register',register)
router.post('/login',login)
router.get('/check',authmiddleware,checkuser )

module.exports=router
const express = require('express')
const Admin= require('../modals/AdminUser')
const {errorHandler} = require('../helper/dbErrorHandler')



const router = express.Router()

const { signUp, signIn,signOut,requireSignin} = require('../controllers/adminUser')

const {userSignupValidator } =require('../validator/index')



//router.post('/signin',signIn)
router.post('/signup',userSignupValidator,signUp)
router.post('/signin',signIn)
router.get('/signout',signOut)





module.exports= router
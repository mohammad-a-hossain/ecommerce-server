const express = require('express')
//const Admin= require('../modals/AdminUser')
/** import all controllers */
//const controller = require('../controllers/authRouter');
//import { registerMail } from '../controllers/mailer.js'
//const {Auth, localVariables } = require('../middlewere/auth');
const router = express.Router()
const {register,login,getAllAdmin,
    getSingleAdmin, deleteaUser, 
    updateAdmin,blockAdmin,unBlockAdmin }= require('../controllers/adminUser');
//const { notFound,errorHandler} = require('../middlewere/errors')
 //const { Route } = require('express');
 const { authMiddlewere,IsAuth } = require('../middlewere/authMiddlewere')



/** POST Methods */
router.post('/register',register); // register user
//router.route('/registerMail').post(registerMail); // send the email
//router.route('/authenticate',verifyUser) // authenticate user
router.post('/login',login);
router.get('/getalladmin',getAllAdmin ) // login in app

router.get('/:id',authMiddlewere,IsAuth,getSingleAdmin) 

router.delete('/:id',deleteaUser)
router.put('/:id',authMiddlewere,updateAdmin)
router.put('/block-admin/:id',authMiddlewere,IsAuth,blockAdmin)
router.put('/unblock-admin/:id',authMiddlewere,IsAuth,unBlockAdmin)
/** GET Methods */
//router.route('/user/:username').get(controller.getUser) // user with username
//router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
//router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
//router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
//router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
//router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password


module.exports= router







































//const express = require('express')
//const Admin= require('../modals/AdminUser')
//const {errorHandler} = require('../helper/dbErrorHandler')



// const router = express.Router()
// const {
//   authUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
// } = require('../controllers/authRouter');

// const {userSignupValidator } =require('../validator/index')



// router.post('/signup',signUp,userSignupValidator )
// router.post('/signin',signIn,)
// //router.get('/getAdmin', verifyToken )
// //router.get('/signout',signOut)

// router.post('/', registerUser);
//  router.post('/auth', authUser);
//  router.post('/logout', logoutUser);
// router
//    .route('/profile')
//   .get(protect, getUserProfile)
//    .put(protect, updateUserProfile);




// module.exports= router



// const express = require('express')
// c//onst Admin= require('../modals/AdminUser')
// import {
//   authUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
// } from '../controllers/userController.js';

// import { protect } from '../middleware/authMiddleware.js';
//import router from './admin';

// const router = express.Router();

// router.post('/', registerUser);
// router.post('/auth', authUser);
// router.post('/logout', logoutUser);
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

//export default router;
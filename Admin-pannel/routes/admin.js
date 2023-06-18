const express = require('express')

const router = express.Router()
const {register,
    login,
    getAllAdmin,
    getSingleAdmin,
     deleteaUser, 
    updateAdmin,
    blockAdmin,
    unBlockAdmin,
     handleRefreshToken,logout }= require('../controllers/adminUser');

 const { authMiddlewere,IsAuth } = require('../middlewere/authMiddlewere')



/** POST Methods */
router.post('/register',register); // register user
router.post('/login',login);
router.get('/getalladmin',getAllAdmin ) // login in app
router.get('/:id',authMiddlewere,IsAuth,getSingleAdmin) 
router.get('/refreshToken',handleRefreshToken)

router.post('/logout',logout)

router.delete('/:id',deleteaUser)
router.put('/:id',authMiddlewere,updateAdmin)
router.put('/block-admin/:id',authMiddlewere,IsAuth,blockAdmin)
router.put('/unblock-admin/:id',authMiddlewere,IsAuth,unBlockAdmin)





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


// exports.userSignupValidator=(req,res,next)=>{

//     req.check('fullName', 'name is required').notEmpty()
//     req.check('email','email must be 6 to 32 charecters').matches(/.+\@.+\..+/).withMessage('email must contain @')
//     .isLength({min:6,max:32})
//     req.check('password','password is requird not empty').notEmpty()
//     req.check('password').isLength({min:6}).withMessage('passwoed must contain 6 charechtere').matches(/\d/)
//     .withMessage('password mustcontain atlest a number')

//     const errors =req.validationErrors()
//     if(errors){
//         const firstError= errors.map(error => error.msg)[0]
//         return res.status(400).json({error:firstError})
//     }
//     next()
// }



//import jwt from 'jsonwebtoken';
// const { expressjwt: jwt } = require("express-jwt");
// const asyncHandler= require('express-async-handler');
// const User = require('../modals/AdminUser');

// exports.protect = asyncHandler(async (req, res, next) => {
//   let token;

//   token = req.cookies.jwt;

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.userId).select('-password');

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error('Not authorized, token failed');
//     }
//   } else {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// });


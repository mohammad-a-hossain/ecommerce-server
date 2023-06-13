// const { expressjwt: jwt } = require("express-jwt");
//import generateToken from './generateToken';

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });

//   res.cookie('jwt', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
//     sameSite: 'strict', // Prevent CSRF attacks
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   });
// };

// export default generateToken;

const jwt = require('jsonwebtoken')


exports.generateToken=(id)=>{
return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'1d'})
}

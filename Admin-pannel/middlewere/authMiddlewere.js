const Admin = require('../modals/AdminUser')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')


exports.authMiddlewere= asyncHandler(async(req,res,next) =>{
  let token 
  if(req?.headers?.authorization?.startsWith('Bearer')){
    token = req?.headers?.authorization.split(' ')[1]

    try{
      if(token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const admin = await Admin.findById(decoded?.id) 
        req.admin= admin 
        next()
      }

    }catch(error){
         throw new Error('not authorize, token expired, login again')
    }
  }else{
    throw new Error('therer is not token attached to header')
  }

next()
})
exports.IsAuth=asyncHandler( async(req,res,next) =>{
  console.log(req.admin)
  const { email} = req.admin
  const adminUser= await Admin.findOne({email})
  if(adminUser.role !== 'admin'){
    throw new Error('you are not admin')
  }else{
     next()
  }
 
}

)


// exports.authMiddlewere= asyncHandler(async(req,res,next) =>{
//   let token 
//   if(req?.headers?.authorization?.startsWith('Bearer')){
//     token = req?.headers?.authorization.split(' ')[1]

//     try{
//       if(token) {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         console.log(decoded)
//         const admin = await Admin.findById(decoded?.id) 
//         req.admin= admin 
//         next()
//       }

//     }catch(error){
//          throw new Error('not authorize, token expired, login again')
//     }
//   }else{
//     throw new Error('therer is not token attached to header')
//   }

// next()
// })


//   exports.Auth=async(req, res)=>{
    //     try {
            
    //         // access authorize header to validate request
    //         const token = req.headers.authorization.split(" ")[1];
    
    //         // retrive the user details fo the logged in user
    //         const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    
    //         req.user = decodedToken;
    
    //         next()
    
    //     } catch (error) {
    //         res.status(401).json({ error : "Authentication Failed!"})
    //     }
    // }
    
    
    // exports.localVariables=(req, res)=>{
    //     req.app.locals = {
    //         OTP : null,
    //         resetSession : false
    //     }
        
    // }
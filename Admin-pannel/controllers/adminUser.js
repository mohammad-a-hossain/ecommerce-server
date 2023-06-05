const Admin = require('../modals/AdminUser')
let uuidv1 = require('uuidv1')
const {errorHandler }= require('../helper/dbErrorHandler')
const jwt = require('jsonwebtoken')
//const { expressJwt } = require('express-jwt'); 
//const { expressjwt: jwt } = require("express-jwt");


exports.signUp=(req, res) =>{

console.log(req.body);

const newAdmin = new Admin({
    fullName:req.body.fullName,
    email: req.body.email,
    password: req.body.password
});

newAdmin.save().then(()=>{
    res.json("an account has created");
}).catch((err)=>{
   return res.status(400).json({
        err:errorHandler(err)
   })
})
}


/* exports.signIn = (req, res) => {
    const { email, password } = req.body;
    // check if user exist
    Admin.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { _id, name, email, role } = user;

        return res.json({
            token,
            user: { _id, name, email, role }
        });
    });
};
 */

exports.signIn= (req,res) =>{
    // const {email , password} = req.body

    // Admin.findOne({ email,password })
    // .then((error, user) => {
    //   //  if (error) return res.status(400).json({ error });
    //     if (user) {
    //        //const isPassword = await user.authenticate(req.body.password);
    //   if( user.authenticate(req.body.password)) {
    //         const token = jwt.sign(
    //           { _id: user._id },
    //           process.env.JWT_SECRET,
    //           { expiresIn: "1d" }
    //         )
    //         //const token = generateJwtToken(user._id, user.role);
    //         const { _id,  email, role, fullname } = user
    //         res.cookie('token',token,{expiresIn:'1d'})
    //         res.status(200).json({
    //           token,
    //           user: { _id, fullname, email, role },
    //         })
    //       } else {
    //         return res.status(400).json({
    //           message: "invalid passwrod",
    //         })
    //       }
    //     } else {
    //       return res.status(400).json({ message: "Something went wrong" })
    //     }
    //   })


    const {  email, password} = req.body 

  try{
          const user=  Admin.find({email,password}).exec() ;

                if(!user){
                    return res.status(400).json({
                        message:'user with this email is not exist'
                    })
                }
                // if(!user.authenticate(password)){
                //             return res.status(401).json({
                //                 error:'email or password did not match'
                //             })
                //         }
                if(user){
                     const { _id, fullName, role} = user
                      const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)

                    res.cookie("t", token, {expire: new Date() +9999})
    
                  
    
                      return res.json({token, user:{ _id, fullName, email, role}})
                }
   
          

            
 
  }catch(err){
    console.log(err)
  }
   

    
}

exports.signOut = (req, res) =>{
    res.clearCookie("t")
    res.json({message:'signg out success'})
}


// exports.requireSignin = jwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"], // added later
//     userProperty: "auth",
//   });


//   exports.requireSignin = expressJwt({
//     secret: process.env.JWT_SECRET,
//     userProperty: 'auth'
// });
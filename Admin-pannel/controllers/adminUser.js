const Admin = require('../modals/AdminUser')
const asyncHandler = require('express-async-handler')
const { generateToken,generateRefreshToken } = require('../utills/Token')
const validateMongoDbId = require('../validator/index')
const jwt = require('jsonwebtoken')



exports.register =asyncHandler (async(req, res) =>{
   const { email} = req.body 

   const findadmin= await Admin.findOne({email})
   if(!findadmin){
   const findadmin =await Admin.create(req.body)
      res.json({findadmin})
   
   }else{
      throw new Error('admin already exits')
   }
     }
   )
  
   exports.login = asyncHandler (async(req, res) =>{
      const { email, password} = req.body 
   
      const findadmin= await Admin.findOne({email})
     // if (findadmin.role !== "admin") throw new Error("Not Authorised");

      if(findadmin && (await findadmin.isPasswordMatched(password))){
        const refreshToken = await generateRefreshToken(findadmin?._id)
        const updateAdminRefreshToken= await Admin.findByIdAndUpdate(findadmin.id,
          {
            refreshToken:refreshToken,
        },{new:true})
        res.cookie("refreshToken",refreshToken,{
          httpOnly:true,
          maxAge:  72 * 60 * 60 * 1000,
        })
         res.json({
            _id: findadmin?._id,
            firstname:findadmin?.firstname,
            lastname:findadmin?.lastname,
            email:findadmin?.email,
            mobile:findadmin?.mobile,
            password:findadmin?.password,
            token:generateToken(findadmin?._id)
         })
      
      }else{
         throw new Error('invalid credintials')
      }
        }
      )
     

      // handle refresh token

exports.handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie)
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  console.log(refreshToken)
  const admin = await Admin.findOne({ refreshToken });
  if (!admin) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || admin.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(admin?._id);
    res.json({ accessToken });
  });
})



    exports.logout= asyncHandler(async (req, res) => {
      const cookie = req.cookies;
      console.log(cookie)
       if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
      const refreshToken = cookie.refreshToken;
      const admin = await Admin.findOne({refreshToken });
      if (!admin) {
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
        });
        return res.sendStatus(204); // forbidden
      }
      await Admin.findOneAndUpdate(refreshToken, {
        refreshToken: "",
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      res.sendStatus(204); // forbidden
    });


      exports.getAllAdmin= asyncHandler (async(req, res) =>{
         
         try{
            const alladmin= await Admin.find()
            res.json(alladmin)

         }catch(error){
           throw new Error(error)
         }
      
           }
         )
  
      exports.getSingleAdmin = asyncHandler (async(req, res) =>{
          const {id } = req.params
          // validation if thi id of mongo or not
          //validateMongoDbId(id)
         try{
           
            const getAdmin= await Admin.findById(id) 
            res.json({
               getAdmin
            })
         }catch(error){
           throw new Error(error)
         }
      
           }
         )




         exports.deleteaUser = asyncHandler(async (req, res) => {
            const { id } = req.params;
            // validation if thi id of mongo or not
          //  validateMongoDbId(id);
          
            try {
              const deleteaUser = await Admin.findByIdAndDelete(id);
              res.json({
               msg:'an admin deleted succes',
                deleteaUser,
              });
            } catch (error) {
              throw new Error(error);
            }
          });

          exports.updateAdmin= asyncHandler(async (req, res) => {
            const { _id } = req.admin;
        //    validateMongoDbId(_id);
          
            try {
              const updateAdmin = await Admin.findByIdAndUpdate(_id,{
               firstname: req?.body?.firstname,
               lastname: req?.body?.lastname,
               email: req?.body?.email,
               mobile: req?.body?.mobile,

              },{new: true,});
              res.json({updateAdmin})
            } catch (error) {
              throw new Error(error);
            }
          })


          
          exports.blockAdmin=asyncHandler(async(req,res)=>{
            const {id} = req.admin
              // validation if thi id of mongo or not
          //    validateMongoDbId(id);
            try{
           const blockAdmin=await Admin.findByIdAndUpdate(id, {isBlocked:true,},{new:true})
           res.json({message:'user is blocked'})
            }catch(error){
              throw new Error(error)
            }
            // next()
          })


          exports.unBlockAdmin=asyncHandler(async(req,res)=>{
            const {id} = req.admin
            // validation if thi id of mongo or not
         //   validateMongoDbId(id);

            try{
           const unblockAdmin=await Admin.findByIdAndUpdate(id, {isBlocked:false,},{new:true})
           res.json({message:'user is unblocked'})
            }catch(error){
              throw new Error(error)
            }
            // next()
          })

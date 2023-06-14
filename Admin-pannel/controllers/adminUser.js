const Admin = require('../modals/AdminUser')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../utills/generateToken')
//let uuidv1 = require('uuidv1')
//const {errorHandler }= require('../helper/dbErrorHandler')
//const jwt = require('jsonwebtoken')
//const { expressJwt } = require('express-jwt'); 
//const { expressjwt: jwt } = require("express-jwt");
//const bcrypt= require('bcrypt')


exports.register =asyncHandler (async(req, res) =>{
   const { firstname,lastname,email, mobile, password} = req.body 

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
      if(findadmin && (await findadmin.isPasswordMatched(password))){
      
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
           // validateMongoDbId(id);
          
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
           // validateMongoDbId(id);
          
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
            const {id} = req.params 
            try{
           const blockAdmin=await Admin.findByIdAndUpdate(id, {isBlocked:true,},{new:true})
           res.json({message:'user is blocked'})
            }catch(error){
              throw new Error(error)
            }
            // next()
          })


          exports.unBlockAdmin=asyncHandler(async(req,res)=>{
            const {id} = req.params 
            try{
           const unblockAdmin=await Admin.findByIdAndUpdate(id, {isBlocked:false,},{new:true})
           res.json({message:'user is unblocked'})
            }catch(error){
              throw new Error(error)
            }
            // next()
          })

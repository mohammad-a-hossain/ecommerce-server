const AdminUser = require('../modals/AdminUser')
const jwt= require('jsonwebtoken')


exports.signUp= async(req,res) =>{
      

    try {

        const admin = await AdminUser.findOne({email:req.body.email})

     
        if (admin) {
            res.status(400).json({
             message: 'this maild admin is already exist'
            })
         
        } else {
            const { email, fullName, password } = req.body;

          const newadmin= await new AdminUser({
              fullName,
              email,
              password,
          }).save()
     
         
          res.send(newadmin);
          console.log('a new user created', newUser);
        }
      } catch (err) {
        res.status(400).send({ error: err.message })
      }

    }

exports.signIn= async(req,res) =>{

    try{
      const admin=  await AdminUser.findOne({email:req.body.email})
 

       // if(error) return res.status(400).json({error})

        if(admin) {
            if(admin.authenticate(req.body.password)){
                const token = jwt.sign({ _id: admin._id  }, process.env.abusenaaron007, {expiresIn:'1hr'})
                const  {fullName,email } = admin  
                res.status(200).json({
                    token,
                    admin:{ _id, fullName, email 
                    }
                })
            } else{
                return res.status(400).json({message: 'invalid password'})
            }
        
        }
    }catch (err) {
        res.status(400).send({ error: err.message })
      }
    
    
}
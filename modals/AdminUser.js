const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const bcrypt= require('bcrypt')


const adminUserSchema = new mongoose.Schema({

    fullName:{
        type:String,
        trim:true,
        min:4,
        max:20,
        required:true
    },
    
    email:{
        type:String,
        required:true,
        index:true,
        trim:true,
    },
    hash_password:{
        type:String,
        required:true
    }
   
}, {timestamps:true})

adminUserSchema.virtual('password').set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10)
})

// adminUserSchema.virtual('fullName').get(function(){
//     return ` ${this.fullName}`
// })

adminUserSchema.method={
    authenticate:function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }
}

module.exports = mongoose.model("Adminuser", adminUserSchema)

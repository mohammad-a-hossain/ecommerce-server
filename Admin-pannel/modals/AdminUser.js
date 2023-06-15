const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const bcrypt= require('bcrypt')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {

    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', userSchema);
//export default Admin;































// const mongoose = require('mongoose')
// const {ObjectId} = mongoose.Schema
// const bcrypt= require('bcrypt')
// const crypto = require('crypto')

// const { v1: uuidv1 } = require('uuid');


// const adminSchema = new mongoose.Schema({

//     fullName:{
//                 type:String,
//                 trim:true,
//                 required:true
//             },
            
//             email:{
//                 type:String,
//                 required:true,
//                 index:true,
//                 trim:true,
//                 unique:32,
//             },
//             hashed_password:{
//                 type:String,
//                 required:true,
//                 },
//             salt:String,
//                 role:{
//                     type:Number,
//                     default:0
//                 },
            
 
// }, {timestamps:true})

// adminSchema.virtual('password')
//     .set(function(password) {
//         this._password = password;
//         this.salt = uuidv1();
//         this.hashed_password = this.encryptPassword(password);
//     })
//     .get(function() {
//         return this._password;
//     });
 
//     adminSchema.methods = {
//     authenticate: function(plainText) {
//         return this.encryptPassword(plainText) === this.hashed_password;
//     },
 
//     encryptPassword: function(password) {
//         if (!password) return '';
//         try {
//             return crypto
//                 .createHmac('sha1', this.salt)
//                 .update(password)
//                 .digest('hex');
//         } catch (err) {
//             return '';
//         }
//     }
// };
 
// module.exports = mongoose.model('Admin', adminSchema);

const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const bcrypt= require('bcrypt')
const crypto = require('crypto')

const { v1: uuidv1 } = require('uuid');


const adminSchema = new mongoose.Schema({

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
        unique:32,
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }

   
}, {timestamps:true})

// virtual field 
// virtual field
adminSchema
    .virtual("password")
    .set(function(password) {
        // create temporary variable called _password
        this._password = password;
        // generate a timestamp
        this.salt = uuidv1();
        // encryptPassword()
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// methods
adminSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = Admin = mongoose.model("admin", adminSchema);

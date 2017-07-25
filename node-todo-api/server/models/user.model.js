const validator = require('validator');
const jwt = require('jsonwebtoken');
var {mongoose} = require('../db/mongoose');
const _ = require('lodash');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            isAsync:true,
            message:'invalid address'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});
//defining collection schema

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();//mongoose method

    return _.pick(userObject,['_id','email']);
    //return only _id and email not the token
    //token were return to header
};


UserSchema.methods.generateAuthToken = function(){
    var user = this;//in instance
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    //jwt.sign(data,key);
    user.tokens.push({access,token});

    return user.save().then(()=>{
        return token;
    });
};
//we need this key word here, so we use regular function

var User = mongoose.model('User',UserSchema);
//defining collection
module.exports = User;
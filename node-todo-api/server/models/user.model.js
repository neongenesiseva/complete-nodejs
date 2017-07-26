const validator = require('validator');
const jwt = require('jsonwebtoken');
var {mongoose} = require('../db/mongoose');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;
/*
    methods are set for instance(document);
    statics are set for model(collection);
*/
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
//specify what data to send back to user


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

UserSchema.methods.removeToken = function(token){
    var user = this;
    return user.update({
        $pull:{
            tokens:{token}
        }
        //$pull:{field:{condition}}
    });
}

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token,'abc123');
        //jwt.verify(token,key);
    } catch(e){
        // return new Promise((resolve,reject)={
        //     reject();
        // });
        return Promise.reject();

    }
    
    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

UserSchema.statics.findByCredentials = function(email,password){
    var User = this;
    
    //why ther is a return here
    return User.findOne({email}).then((user)=>{
        if (!user){
            return Promise.reject('no such user');//trigger catch(err) directly
        } else {
            return new Promise((resolve,reject)=>{
            bcrypt.compare(password,user.password,(err,res)=>{
                if (res){
                    resolve(user);
                } else {
                    reject('wrong password');
                }
            })
            })
        }
        })
    };

UserSchema.pre('save',function(next){
    var user = this;
    
    //chech if user instance, password property is modified -> a mongoose method
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
        if (err){
            return err
            }
            user.password = hash;
            next();
            });
        });
    } else {
        next();
    }
});
//mongoose middleware, do this previous 'save' event, to salt and hash the password

var User = mongoose.model('User',UserSchema);
//defining collection
module.exports = User;
var {mongoose} = require('../db/mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    gender:{
        type:Boolean,
        default:false
    },
    age:{
        type:Number,
        default:null
    }
});
//defining collection schema

var User = mongoose.model('User',userSchema);
//defining collection
module.exports = User;
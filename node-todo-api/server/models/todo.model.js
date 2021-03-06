var {mongoose} = require('../db/mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    },
    _creator:{
        required:true,
        type:mongoose.Schema.Types.ObjectId
    }
});
//defining collection schema

var Todo = mongoose.model('todo',todoSchema);
//defining collection
module.exports = Todo;
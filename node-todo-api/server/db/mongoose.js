var mongoose = require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp',{useMongoClient:true});
//defining database

module.exports = {mongoose};
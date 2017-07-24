var mongoose = require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI,{useMongoClient:true});
//defining database

module.exports = {mongoose};
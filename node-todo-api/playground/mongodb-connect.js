//const MongoClient = require('mongodb').MongoClient;const ObjectId = require('mongodb').ObjectId
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if (err) {
        console.log('unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');

    db.collection('Todos').insertOne({
        text:'Something to do',
        completed:false
    },(err,result)=>{
        if (err) {
            return console.log('unable to insert todo',err)
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });
    //create a new collection and insert document into it

    db.close();
});
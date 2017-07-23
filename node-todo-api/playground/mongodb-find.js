//const MongoClient = require('mongodb').MongoClient;const ObjectId = require('mongodb').ObjectId
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if (err) {
        console.log('unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');

    db.collection('Todos').find({completed:false}).toArray().then((docs)=>{
        console.log('Todos')
        console.log(JSON.stringify(docs,undefined,2))
    },(err)=>{
        console.log('unable to fetch todos',err)
    })
    //query id should be 
    /*
    db.collection('Todos').find({
        _id:new ObjectID('/id you want to find/')
    })
    */
    db.collection('Todos').find({}).count().then((count)=>{
        console.log('Todos count:',count)
    },(err)=>{
        console.log('unable to fetch todos',err)
    })

    db.close();
});
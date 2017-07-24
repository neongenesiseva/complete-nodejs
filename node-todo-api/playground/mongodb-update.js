const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if (err) {
        return console.log('unable to connect to MongoDB server')
    }
    console.log('connected to mongodb server');

    //deleteMany
    db.collection('Todos').findOneAndUpdate({
        _id:new ObjectID("597524d10409c40774074cc6")
    },{
        $set:{
            completed:true
        }
    },{
        returnOriginal : false
    }).then((result)=>{
        console.log(result);
    });

    //$set is a mongodb operator, $inc: increase a certain field value by a number, 
    //https://docs.mongodb.com/manual/reference/operator/update/
    //option reference http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
    //option returnOriginal true:return the original value, false:return the updated one

    
    db.close()
})
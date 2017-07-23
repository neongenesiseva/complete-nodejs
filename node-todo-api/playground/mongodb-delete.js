const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if (err) {
        return console.log('unable to connect to MongoDB server')
    }
    console.log('connected to mongodb server');

    //deleteMany
    db.collection('Todos').deleteMany({text:"having lunch"}).then((result)=>{
        console.log('deleted,',result)
    })
    //deleteOne will delete the first one fulfilled the condition,return the result of processing
    //findOneAndDelete the same with deleteOne, but return the deleted document only

    db.close()
})
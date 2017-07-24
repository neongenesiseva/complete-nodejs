var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var Todo = require('./models/todo.model');
var User = require('./models/user.model');

var app = express();

app.use(bodyParser.json());
//add body-parser as middleware;

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.status(201).send(doc);
    },(err)=>{
        res.status(400).send(err);
    })
});

app.get('/todos',(req,res)=>{
    Todo.find({}).then((todos)=>{
        res.status(200).send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    //valid i using isValid;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    };
    Todo.findById(id).then((todo)=>{
        if (!todo){
            return res.status(404).send()
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send()
    })
})

app.listen(3300,()=>{
    console.log('server started on 3300');
})

module.exports = {app};
// same with module.exports.app = app;


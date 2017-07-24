var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var Todo = require('./models/todo.model');
var User = require('./models/user.model');

var app = express();
const port = process.env.PORT || 3300;

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
});

app.delete('/todos/:id',(req,res)=>{
    //get the id
    var id = req.params.id;
    //validate the id
    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    };
    //remove todo by id
    Todo.findByIdAndRemove(id).then((todo)=>{
        if (!todo){
            return res.status(404).send()
        }
        res.status(200).send(todo);
    }).catch((err)=>{
        res.status(400).send();
    })
});

app.listen(port,()=>{
    console.log(`server started on ${port}`);
})

module.exports = {app};
// same with module.exports.app = app;


const express = require('express');

var app = express();

app.get('/',(req,res)=>{
    res.status(404).send({
        error:'Page not found',
        name:'todo app v1.0'
    });
});

app.get('/users',(req,res)=>{
    res.send([{
        name:'tom',
        age:23
    },{
        name:'chris',
        age:24
    },{
        name:'grace',
        age:25
    }])
})

app.listen(3000);

module.exports.app = app;

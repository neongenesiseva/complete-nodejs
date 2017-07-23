const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log',log+'\n');
    next();
})
//app.use is used to register middleware

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
//     next();
//     //if next() is missing, the rest file will not be executed
// })

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'home page'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'about page'
    })
    //res.render will automatically lookup the views folder to find the about.hbs file;
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'unable to handle request'
    });
});

app.listen(3000,()=>{
    console.log('server is running at 3000')
});
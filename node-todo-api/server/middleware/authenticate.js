var User = require('../models/user.model');

var authenticate = (req,res,next)=>{
    var token = req.header('x-auth');

    User.findByToken(token).then((user)=>{
        if (!user){
            return Promise.reject();
            //this will skip directly to the catch(err);
        }
        req.user = user;
        req.token = token;
        next();//if next() is not called, the req,res would not passed downward
    }).catch((err)=>{
        res.status(401).send();
        //401 unauthorized
    });
};//middleware

module.exports = authenticate;


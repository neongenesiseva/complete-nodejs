const expect = require('expect');
const rewire = require('rewire');


var app = rewire('./app');

describe('App',()=>{

    var db ={
        saveUser:expect.createSpy()
    };

    app.__set__("db.saveUser",db.saveUser);//replace db with spy db;

    it('should call the spy correctly',()=>{
        var spy=expect.createSpy();
        spy('grace',25);//call spy with certain value
        expect(spy).toHaveBeenCalledWith('grace',25);//check 
    });

    it('should call saveUser with user object',()=>{
        var email = 'chrisli27@outlook.com';
        var password = "123abc";

        app.handleSingup(email,password);//module.exports.handleSignup
        expect(db.saveUser).toHaveBeenCalledWith({email,password});
    });
});


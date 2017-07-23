const expect = require('expect');
const utils = require('./utils');

describe('utils',()=>{
    it('should add two numbers',()=>{
        var res = utils.add(33,11);
        expect(res).toBe(44).toBeA('number');
    });

    it('should square two number',()=>{
        var res = utils.square(3);
        expect(res).toBe(9).toBeA('number');
    });

    it('verify first and last name',()=>{
        var res = utils.setName({},'Chris Li');
        expect(res.firstName).toInclude('Chris');
        expect(res).toInclude({lastName:'Li'});
        expect(res).toEqual({firstName:'Chris',lastName:'Li'});
    });

    it('async callback add two number',(done)=>{
        utils.asyncAdd(3,4,(sum)=>{
            expect(sum).toBe(7).toBeA('number');
            done();
        })
    });//done remind mocha this is a async function
})



it('compare two objects',()=>{
    expect({a:'a'}).toEqual({a:'a'}); // this will success
    //expect({a:'a'}).toBe({a:'a'}); //this will fail 
});



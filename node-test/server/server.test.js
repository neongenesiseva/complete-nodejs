const app = require('./server').app;
const request = require('supertest');
const expect = require('expect');

describe('Server',()=>{
    describe('GET /',()=>{
        it('should return hello world response',(done)=>{
        request(app)
            .get('/')
            .expect(404)//this expect is from 'supertest'
            .expect((res)=>{
                expect(res.body).toInclude({
                    error:'Page not found',
                    name:'todo app v1.0'
                })//this expect is from 'expect'
            })
            .end(done);
        });
    });
    
    describe('GET /users',()=>{
        it('should return my user object',(done)=>{
        request(app)
            .get('/users')
            .expect(200)
            .expect((res)=>{
                expect(res.body.length).toBe(3);
                expect(res.body).toInclude({
                    name:'grace',
                    age:25
                })
            })
            .end(done);
        });
    }); 
})



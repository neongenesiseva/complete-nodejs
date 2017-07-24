const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const Todo = require('../models/todo.model');

beforeEach((done)=>{
    Todo.remove({}).then(()=>{done()})
})

describe('post /todos',()=>{
    it('should create a new todo',(done)=>{
        var text = 'test todo test';

        request(app)
            .post('/todos')//use app.post('/todos)
            .send({text}) //pass text data 
            .expect(201)  //expect status code return 200, in this case 201
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })            //request will return something, expect the current return text is 'text' we send
            .end((err,res)=>{
                if (err){
                    return done(err);
                }
                Todo.find({}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done()
                }).catch((err)=>{
                    done(err)
                })
            })//check mongodb Todo collection, find if length is 1 (newly created )
    });

    it('should not create todo',(done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if (err){
                    return done(err)
                }
                Todo.find({}).then((todos)=>{
                    expect(todos.length).toBe(0);
                    done();
            }).catch((err)=>{
                done(err)
            })
        });
    })
})
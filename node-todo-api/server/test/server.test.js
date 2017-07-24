const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const Todo = require('../models/todo.model');

const todos = [{
    text:'First test todo'
},{
    text:'Second test todo'
}]

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos);
    }).then(()=>done());//remove then insert our test data
});

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
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
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
                    expect(todos.length).toBe(2);
                    done();
            }).catch((err)=>{
                done(err)
            })
        });
    })
})

describe('GET /todos',()=>{
    it ('should get all todos',(done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
})
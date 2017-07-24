const expect = require('expect');
const request = require('supertest');
const {ObjectID}=require('mongodb');

const {app} = require('../server');
const Todo = require('../models/todo.model');

const todos = [{
    _id: new ObjectID(),
    text:'First test todo',
    completed:false,
    completedAt:null
},{
    _id: new ObjectID(),
    text:'Second test todo',
    completed:true,
    completedAt:123
}]

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos);
    }).then(()=>done());//remove all documents then insert our test data
});

describe('POST /todos',()=>{
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
    });
})

describe('GET /todos/:id',()=>{
    it ('get the todo doc',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe('First test todo');
            })
            .end(done);
    });

    it ('return 404 if no todo found',(done)=>{
        var hexId = new ObjectID().toHexString();
        //pass a valid hexstring id 
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('return 404 if the id is invalid',(done)=>{
        //pass a invalid id
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    })
})

describe('DELETE /todos/:id',()=>{
    it ('delete the todo doc',(done)=>{
        
        var hexId=todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe('First test todo')
            })
            .end((err,res)=>{
                if (err){
                    return done(err);
                };

                Todo.findById(hexId).then((todo)=>{
                    expect(todo).toNotExist();
                    done();
                });

            })//check mongodb Todo collection, check if only one data left
    });

    it ('return 404 if no todo found',(done)=>{
        var hexId = new ObjectID().toHexString();
        //pass a valid hexstring id 
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)//return not found
            .end(done);
    });

    it('return 404 if the id is invalid',(done)=>{
        //pass a invalid id
        request(app)
            .delete(`/todos/123`)
            .expect(400)//return bad request
            .end(done);
    })
})

describe('PATCH /todos/:id',()=>{
    it('set true, and get completedAt',(done)=>{
        var hexId = todos[0]._id;
        var body = {
            completed:true,
            text:'patched note'
        };

        request(app)
            .patch(`/todos/${hexId}`)
            .send(body)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe('patched note');//res.todo is a JSON file, res.body.todo is a object
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end((err,res)=>{
                if(err){
                    return done(err)
                }
                Todo.find({}).then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err)=>{
                    done(err);
                })
            })//make sure it is update, not adding or dropping
    });

    it('set false, and wipe completeAt',(done)=>{
        var hexId = todos[1]._id;
        var body = {
            completed:false
        };

        request(app)
            .patch(`/todos/${hexId}`)
            .send(body)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end((err,res)=>{
                if(err){
                    return done(err)
                }
                Todo.find({}).then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err)=>{
                    done(err);
                })
            })
    })
})
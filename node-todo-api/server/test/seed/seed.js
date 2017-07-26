const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const Todo = require('../../models/todo.model');
const User = require('../../models/user.model');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
    _id: new ObjectID(),
    text:'First test todo',
    completed:false,
    completedAt:null,
    _creator:userOneId
},{
    _id: new ObjectID(),
    text:'Second test todo',
    completed:true,
    completedAt:123,
    _creator:userTwoId
}];

const users = [{
    _id:userOneId,
    email:'userone@example.com',
    password:'userone',
    tokens:[{
        access:'auth',
        token: jwt.sign({_id:userOneId,access:'auth'},'abc123').toString()
    }]
},{
    _id:userTwoId,
    email:'usertwo@example.com',
    password:'usertwo'
}]

const populateTodos = (done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos);
    }).then(()=>done());//remove all documents then insert our test data
};

const populateUsers = (done)=>{
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        //new User => create an instance, .save()=>save info with promise chaining.
        //we cannot use insertMany here since they have unique info.
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo])
    }).then(()=>done());
}

module.exports = {todos,users, populateTodos,populateUsers};

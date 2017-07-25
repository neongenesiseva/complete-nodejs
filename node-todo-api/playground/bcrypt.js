var bcrypt = require('bcryptjs');

var password = '123abc';

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        if (err) throw err;
        console.log(hash);
    });
});

var hashedPassword = '$2a$10$NjDI.V9zqDZusuhraPEY8Oi6GqiMHtTw3lzIMnO2E7InnbGe6aYLq';

bcrypt.compare(password,hashedPassword,(err,res)=>{
    console.log(res);//true or false
})
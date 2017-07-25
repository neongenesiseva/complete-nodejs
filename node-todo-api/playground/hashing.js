const {SHA256} = require('crypto-js');
//one way encrypted

var message = "I am user number 3";
var hash = SHA256(message).toString();

console.log(`message:${message}`);
console.log(`Hash:${hash}`);

var data = {
    id:4
};

var token = {
    data,
    hash:SHA256(JSON.stringify(data)+"secretkey").toString()
};
//"secretkey" is a key to 'salt' the data

var resultHash = SHA256(JSON.stringify(token.data)+"secretkey").toString();

if (resultHash === token.hash){
    console.log('good')
} else {
    console.log('you bad bad')
}

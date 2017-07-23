var square = x=>x*x;
console.log(square(9));

var user = {
    name:'chris',
    sayHi:()=>{
        console.log(arguments);//return global varibale ->module{}
        console.log(`hi,${this.name}`);//this will return undefined, 
    },
    sayHiAlt (){
        console.log(arguments);
        console.log(`hi,${this.name}`);
    }// this is ES6 new syntax feature;
};

user.sayHi();
user.sayHiAlt(1,2,3);
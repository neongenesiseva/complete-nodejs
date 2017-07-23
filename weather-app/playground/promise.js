var asyncAdd = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (typeof a === 'number' && typeof b === 'number'){
                resolve(a+b);
            } else {
                reject('Arguments must be numbers');
            }
        },1500)
    })
}

asyncAdd(5,7).then((res)=>{
    console.log('Result:',res);
    return asyncAdd(res,'33');
},(error)=>{
    console.log(error)
}).then((res)=>{
    console.log(res)
}).catch((error)=>{
    console.log(error)
})

// var somePromise = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         reject('hey,it worked');
//     },2500);

// });

// somePromise.then((message)=>{
//     console.log('Success:',message)
// },(error)=>{
//     console.log('fail',error)
// });
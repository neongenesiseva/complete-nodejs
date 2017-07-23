const request = require('request');

var geocodeAddress = (address)=>{
    
    return new Promise((resolve,reject)=>{
        let argument = encodeURIComponent(address);
        request({
        url:`http://maps.googleapis.com/maps/api/geocode/json?address=${argument}`,
        json:true
        },(error,request,body)=>{
            if (error){
            reject('cannot connect to server');
            } else if (body.status === "ZERO_RESULTS"){
            reject("no result");
            } else {
            resolve(body.results[0].geometry.location);
            }
        })
    })
};

geocodeAddress('08619').then((location)=>{
    console.log(JSON.stringify(location,undefined,2));
},(error)=>{
    console.log(error);
})
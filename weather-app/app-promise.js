const yargs = require('yargs');
const axios = require('axios');
const request = require('request');

const argv = yargs
    .options('a',{
        demand:true,
        alias:'address',
        describe:'Address to fetch weather for',
        string:true
    })
    .help()
    .alias('help','h')
    .argv
/* This works but axios did it better
// var geocodeAddress = (address)=>{
    
//     return new Promise((resolve,reject)=>{
//         let argument = encodeURIComponent(address);
//         request({
//         url:`http://maps.googleapis.com/maps/api/geocode/json?address=${argument}`,
//         json:true
//         },(error,request,body)=>{
//             if (error){
//             reject('cannot connect to server');
//             } else if (body.status === "ZERO_RESULTS"){
//             reject("no result");
//             } else {
//             resolve(body.results[0].geometry.location);
//             }
//         })
//     })
// };

// geocodeAddress(argv.a).then((res)=>{
//     console.log(JSON.stringify(res,undefined,2));
// },(error)=>{
//     console.log(error);
// });
*/

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response)=>{
    if (response.data.status==='ZERO_RESULTS'){
        throw new Error('unable to find that address')
    }
    var location = response.data.results[0].geometry.location;
    var weatherUrl = `https://api.darksky.net/forecast/291ee56fe2255914858bb00bbad64ac2/${location.lat},${location.lng}`;

    return axios.get(weatherUrl);
    //this returned axios call needs chaining then to process the promise;
}).then((response)=>{
        var temperature = response.data.currently.temperature;
        console.log(temperature);
}).catch((e)=>{
    if (e.code === 'ENOTFOUND'){
        console.log('unable to connect API server');
    } else {
        console.log(e.message);
    }
})
//catch error just need one, because once the promise hits a reject, it will stop instantly;
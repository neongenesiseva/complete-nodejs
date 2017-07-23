const request = require('request');

module.exports.geoAddress=function (argv,callback){

        let argument = encodeURIComponent(argv.a);

        request({
            url:`http://maps.googleapis.com/maps/api/geocode/json?address=${argument}`,
            json:true
        },(error,response,body)=>{
            if (error){
                callback('unable to connect server')
            } else if (body.status === "ZERO_RESULTS"){
                callback('Unable to find the address')
            } else if (body.status === "OK"){
                callback(undefined,body.results[0].geometry.location)
                //undefined will make caller skip the first argument
            } else {
                console.log('unseen error');
            }
        });

}
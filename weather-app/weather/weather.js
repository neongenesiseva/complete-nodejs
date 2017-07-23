const request = require('request');

var getWeather=(location,callback)=>{
    request({
        url:`https://api.darksky.net/forecast/291ee56fe2255914858bb00bbad64ac2/${location.lat},${location.lng}`,
        json:true
        },(error,response,body)=>{
            if (error){
                callback('server error')
            } else {
                callback(undefined,body.currently)
            }
    })
}

module.exports.getWeather = getWeather;
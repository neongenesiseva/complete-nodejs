const yargs = require('yargs');
const fs = require('fs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options('a',{
            demand:true,
            alias:'address',
            describe:'Address to fetch weather for',
            string:true
        }
    )
    .help()
    .alias('help','h')
    .argv;

geocode.geoAddress(argv,(errorMessage,results)=>{
    if (errorMessage){
        console.log(errorMessage);
        fs.writeFileSync('address.txt',errorMessage);
    } else {
        var location = results;
        weather.getWeather(location,(errorMessage,results)=>{
            if (errorMessage){
                console.log(errorMessage);
            } else if (results.code === 400){
                console.log('wrong input')
            } else {
                fs.writeFileSync('weather.json',JSON.stringify(results,undefined,2));
                //store the data into json file
                console.log(`this currently is ${results.temperature} degrees`)
            }
        })
        //JSON.stringify(content,filter,space per intentation);
    }
});

//API_KEY=https://api.darksky.net/forecast/291ee56fe2255914858bb00bbad64ac2/LAT,LON

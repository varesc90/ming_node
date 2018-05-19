const yargs = require('yargs');
const axios = require('axios');
const api = `fbebddd5c9f474e1fc190dd79440d60e`;

const geocode = require('./geocode/geocode');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response)=>{
    if(response.data.status == "ZERO_RESULTS"){
        throw new Error('unable to find that address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var formattedAddress = response.data.results[0].formatted_address;
    var weatherUrl = `https://api.darksky.net/forecast/${api}/${lat},${lng}`;

    console.log(formattedAddress);

    return axios.get(weatherUrl);

}).then((response)=> {
    var temperature = response.data.currently.temperature;
    var apperentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It's feel like ${apperentTemperature}.`);
}).catch((e)=>{
    if(e.code == 'ENOTFOUND') {
        console.log("Cannot connect to API Server");
    }else{
        console.log(e.message);
    }
});
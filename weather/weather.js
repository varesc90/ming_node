const request = require('request');
const api = 'xx';


var getWeather = (lat,long,callback) => {
    request({
        url: `https://api.darksky.net/forecast/${api}/${lat},${long}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            console.log('Unable to connect to Forecast.io server.');
        } else if (response.statusCode === 400) {
            console.log('Unable to fetch weather.');
        } else if (response.statusCode === 200) {
            callback(undefined, {
               tempature:body.currently.temperature
            });
        }else{
            console.log(response.body);
        }
    });
}

module.exports.getWeather = getWeather;

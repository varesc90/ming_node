const request = require('request');
const api = '';


var getWeather = (lat,long,callback) => {
    request({
        url: 'https://api.forecast.io/forecast/'+api+'/'+lat+','+long,
        json: true
    }, (error, response, body) => {
        if (error) {
            console.log('Unable to connect to Forecast.io server.');
        } else if (response.statusCode === 400) {
            console.log('Unable to fetch weather.');
        } else if (response.statusCode === 200) {
            console.log(body.currently.temperature);
        }
    });
}

module.exports.getWeather = getWeather;

const request = require('request');


var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
            json: true
        }, (error, response, body) => {
            // console.log(JSON.stringify(body,undefined,2));
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longtitude: body.results[0].geometry.location.lng
                });
            } else {
                reject(response);
            }
        });
    });
}

var printResponse = (message) =>{
    console.log(message);
}

    geocodeAddress('CentralRama2').then((message)=>{console.log(message)},(message)=>{console.log(message)});




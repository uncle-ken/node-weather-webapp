const request = require ('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/2018c20763a5bcdc6d13fd119b5dc492/' + lat + ',' + long + '?units=si'

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if ( body.error){
            callback(body.error)
        } else {
            // callback (undefined, {
            //     summary: response.body.daily.data[0].summary,
            //     temperature: response.body.currently.temperature,
            //     rainProb: response.body.currently.precipProbability
            // })

            callback (undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability +'% chance of rain.')
        }
    })
}

module.exports = forecast
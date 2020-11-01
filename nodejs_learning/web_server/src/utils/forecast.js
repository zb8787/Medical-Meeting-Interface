const { stringify } = require('querystring')
const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2cd69193d4859ed163ff0223b80b52c5&query=' + longtitude + ',' + latitude + '&units=f'
    request({url, json:true}, (error,{body}) => {
        if (error){  
            callback("connection fail",undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined,
                // current_temperature: body.current.temperature,
                // feelslike_temperature: body.current.feelslike,
                // weather_descriptions: body.current.weather_descriptions[0]
                "The current temperature is " + body.current.temperature + " F. It feels like " + body.current.feelslike 
                + " F. The weather overall is " + body.current.weather_descriptions[0] + " ."
            )        
        } 
    })
}

module.exports = forecast
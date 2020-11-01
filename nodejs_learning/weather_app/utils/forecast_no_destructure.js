const { stringify } = require('querystring')
const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2cd69193d4859ed163ff0223b80b52c5&query=' + longtitude + ',' + latitude + '&units=f'
    request({url: url, json:true}, (error,response) => {
        if (error){  
            callback("connection fail",undefined)
        } else if (response.body.error) {
            callback(response.body.error.info, undefined)
        } else {
            callback(undefined,{
                current_temperature: response.body.current.temperature,
                feelslike_temperature: response.body.current.feelslike,
                weather_descriptions: response.body.current.weather_descriptions[0]
            })        
        } 
    })
}

module.exports = forecast
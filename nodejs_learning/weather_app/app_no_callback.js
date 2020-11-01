const { stringify } = require('querystring')
const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=2cd69193d4859ed163ff0223b80b52c5&query=37.8267,-122.7233&units=f'

// request(options, callback)
request({url: url, json:true}, (error,response) => {
    if (error){
        // use for lower level os things 
        console.log("connection fail")
    } else if (response.body.error) {
        console.log(response.body.error.info)

    } else {
        console.log("It is currently " + response.body.current.temperature + " Fahrenheit out. It feels like " +  response.body.current.feelslike + " Fahrenheit out.")
        console.log(response.body.current.weather_descriptions[0])
    // first element of a string 
    } 
})


// Geocoding 
// adress -> lat/long -> weather 
 const url_geo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZmVuZzQ1IiwiYSI6ImNrZ3ZmMnBkMTAyaXMyenZ5MDZrNXZleHQifQ.yZQK_oFRN17rRSxQHq2tJw&limit=1'
 const url_wrong = 'https://api.mapbox.com/geocoding/v5/mapbox.places/121231234121312.json?access_token=pk.eyJ1IjoiZmVuZzQ1IiwiYSI6ImNrZ3ZmMnBkMTAyaXMyenZ5MDZrNXZleHQifQ.yZQK_oFRN17rRSxQHq2tJw&limit=1'
 // response.body has to be there: since the function already parsed 
request({url: url_geo, json:true}, (error,response) => {
    if (error){
        console.log("connection fail")
        // response.body.features = [] does not work 
    } else if (response.body.features.length === 0){
        console.log("Invalid address")
    } else{
        const latitude = response.body.features[0].center[1]
        const longtitude = response.body.features[0].center[0]
        console.log("Coordinates are: " + latitude + " and " + longtitude)
    }
}) 
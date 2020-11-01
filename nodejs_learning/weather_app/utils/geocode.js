const { stringify } = require('querystring')
const request = require('request')

const geocode = (address,callback ) => {
    // encodeURIComponent: handle special characters 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmVuZzQ1IiwiYSI6ImNrZ3ZmMnBkMTAyaXMyenZ5MDZrNXZleHQifQ.yZQK_oFRN17rRSxQHq2tJw&limit=1'
    request({ url, json:true}, (error,{body}) => {
        if (error){
            callback("connection fail", undefined)
        } else if (body.features.length === 0){
            callback("Invalid address", undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    }) 
}

module.exports = geocode
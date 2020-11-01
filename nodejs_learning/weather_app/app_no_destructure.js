const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


// forecast(37.8267,-122.7233, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })

// geocode("Boston", (error, data) => {
//     console.log("error", error)
//     console.log("Data", data)
// })

// error check 
// use return to pause the callback function if an error is detected 
const command = process.argv[2]

// teaching approach 
if (!command){
  console.log("alternative ")
}

if (process.argv.length === 3){
  geocode(command, (error, data_geo) => {
    if (error){
      console.log("error", error)
    }
    forecast(data_geo.latitude, data_geo.longtitude, (error, data_forecast) => {
      if (error){
        return console.log('Error', error)
      }  
      console.log('Data', data_geo.location)
      console.log(data_forecast)
    })
  }) 
}
else{
  console.log("invalid input")
}



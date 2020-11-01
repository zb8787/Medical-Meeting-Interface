const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const command = process.argv[2]

// teaching approach 
if (!command){
  console.log("alternative ")
}

// since location property is listed, we can destructure to extract the location property in advance 
// default function parameter {latitude, longtitude, location} = {}
// we get undefined for all of them, which is fine 
if (process.argv.length === 3){
  geocode(command, (error, {latitude, longtitude, location} = {}) => {
    if (error){
      console.log("error", error)
    }
    forecast(latitude, longtitude, (error, data_forecast) => {
      if (error){
        return console.log('Error', error)
      }  
      console.log('Data', location)
      console.log(data_forecast)
    })
  }) 
}
else{
  console.log("invalid input")
}



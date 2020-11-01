const path = require('path')
const express = require('express')
// express is a function 
const app = express()

// console.log(__dirname) // directory: we need this to point to public folder 
// console.log(__filename) // directory with file name
// '..': to go up a folder  => ../.. go up two folder
// console.log(path.join(__dirname, '../public'))

// a way to customize your server 
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// get the resources at specific URL
// req: request; res: response 
// app.com
// HTML form 
// overwrote by static directory 
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

// app.com/help
// parsed JSON
app.get('/help', (req, res)=>{
    res.send([{
        name: 'Feng'       
    },{
        age: 27
    }])
})

// app.com/about
app.get('/about', (req, res)=>{
    res.send('<h1>About page</h1>')
})

// app.com/weather
app.get('/weather', (req, res)=>{
    res.send([{
        location: 'Boston',
        forecast: 'It is snowingb '
    }])
})

// start the server 
// port + a callback function (asynchronous)
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

// node src/app.js
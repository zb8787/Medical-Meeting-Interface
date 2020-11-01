const path = require('path')
const express = require('express')
// express is a function 
const app = express()

// set up handle bar with express 
// has to be like this --> this is the default
// folder called views
app.set('view engine', 'hbs')

// access through ...web.html
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// handle bar
// allow to change content in function
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App 1.0',
        name: 'Feng Wang'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Feng Wang'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'Here is a list of common questions.'
    })
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
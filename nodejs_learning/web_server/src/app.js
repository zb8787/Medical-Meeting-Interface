const path = require('path')
const express = require('express')
// express is a function 
const app = express()
// load hbs
const hbs = require('hbs')
// load function 
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

// customized view location  for handlebar
const viewPath = path.join(__dirname, '../templates/views')
app.set('view engine', 'hbs')
app.set('views', viewPath)

// set up static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// create a universal template using hbs
// need to use single quotation mark
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


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
        helpText: 'Here is a list of common questions.',
        name: 'Feng Wang'
    })
})

// app.com/weather
// This is an endpoint
// you can only have one res.send per run 
// use return to end the function when there is an error right away
app.get('/weather', (req, res)=>{
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'No address provided.'})
    } 
    geocode(address, (error, geo_data = {}) => {
        if (error){
            return res.send({"error": error})
        }
        forecast(geo_data.latitude, geo_data.longtitude, (error, data_forecast) => {
            if (error){
                return res.send({"error": error}) 
            }  
            res.send({
                location: address,
                address: geo_data.location,
                forecast: data_forecast
            })
        })
    })   
})


// experiment  
// query string info in request 
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No search term provided.'})
    }
    res.send({
        product: req.query.search
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: "Help article not found",
        title: '404',
        name: 'Feng Wang'
    })
})

// 404 page for everything else
// '*' match anything that has not been defined before
// has to be at the last (look for match in order)
app.get('*', (req, res) => {
    res.render('error', {
        error: "Page not found",
        title: '404',
        name: 'Feng Wang'
    })
})

// start the server 
// port + a callback function (asynchronous)
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

// node src/app.js
// nodemon src/app.js -e js,hbs (allow updates with hbs)
const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=2cd69193d4859ed163ff0223b80b52c5&query=37.8267,-122.7233&units=f'

const request = http.request(url, (response) => {
    // register a handler 
    // data sent in as trunks and we need to figure out when will all the data be sent in 
    // let: value can change
    let data = ''
    response.on('data',(chunk)=>{
        data = data + chunk.toString()
    })
    response.on('end', ()=>{
        const body = JSON.parse(data)
        console.log(body)
    })
})
request.on('error',(error) => {
    console.log(error)

})
request.end()
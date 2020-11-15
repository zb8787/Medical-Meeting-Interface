const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/label')
const userRouter = require('./routers/user')
const labelRouter = require('./routers/label')


const app = express()
const port = process.env.PORT


// grad incoming body data
app.use(express.json())

app.use(userRouter)
app.use(labelRouter)


app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})


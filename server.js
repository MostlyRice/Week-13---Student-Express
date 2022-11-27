let express = require('express')
let api_routes = require('./routes/studentapi.js')
let path = require('path')

// create web application
let app = express()

let vueClientPath = path.join(__dirname, 'student-sign-in-client', 'dist')
app.use(express.static(vueClientPath))

// be able to handle JSON requests, convert data to JavaScript
app.use(express.json())

app.use('/studentapi', api_routes)

app.use(function(req, res, next) {
    // response with a 404 to any other requests
    res.status(404).send('Not found')
})

// error response -- important to send a response to every request
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Server error')
})

// start server running
let server = app.listen(process.env.PORT || 3000, function(){
    console.log('Express server running on port ', server.address().port )
})
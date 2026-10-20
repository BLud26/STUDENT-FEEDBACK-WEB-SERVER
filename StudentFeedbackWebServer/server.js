const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')

const app = express() // Creates the web application server

// Tell app where views are
app.set('views', path.join(__dirname, 'views')) // Views are html files or things that will become html files
app.set('view engine', 'hbs') // use handlebars as view engine

//enable parsing
app.use(bodyParser.urlencoded({ extended: false }))

const staticFileLocation = path.join(__dirname, 'public')
app.use(express.static(staticFileLocation))

app.use('/', indexRouter) // All requests to the app will be passed to indexRouter

// Start server running
const server = app.listen(process.env.PORT || 3000, function(){
    console.log('Server running on port ' + server.address().port)
})
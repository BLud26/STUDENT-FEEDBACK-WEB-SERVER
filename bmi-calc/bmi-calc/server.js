const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

// Use Handlebars for templates. Views live in the views folder,
// and views/layout.hbs wraps every page automatically.
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// Serve static files (the stylesheet) from the public folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// Start the server on port 3000, or the PORT environment variable if set
const server = app.listen(process.env.PORT || 3000, function(){
    console.log('Server running on port ' + server.address().port);
})

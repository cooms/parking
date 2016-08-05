var bodyParser = require('body-parser')
var express = require('express')
var hbs = require('express-handlebars')
var path = require('path')

var index = require('./routes/index')

var PORT = process.env.PORT || 3000

var app = express()
app.use(express.static('public'));
app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', index.get)

app.get('/searchCar', index.searchCar)

app.get('/register', index.register)

app.post('/registerUser', index.registerUser)

app.get('/sms/:id', index.sms)

app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})

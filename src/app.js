const path = require ('path')
const express = require ('express')
const hbs = require('hbs')

// Require Geocode and Forecast files
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Defining variable for port by Heroku || 3000 for localhost
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join (__dirname, '../templates/views')
const partialsPath = path.join (__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use (express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kenneth Ng'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kenneth Ng'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Kenneth Ng'
    })
})

app.get ('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Address not provided.'
        })
    }

    geocode (req.query.address, (error, {lat, long, place_name} = {}) => {
        if (error) {
            return res.send({ error })
        }   
    
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                location: place_name,
                address: req.query.address,
                forecast: forecastData
            })
            // console.log('Weather for ' + place_name)
            // console.log(forecastData)
        })
    })

    // res.send({
    //     forecast: '30 deg',
    //     location: 'Singapore',
    //     address: req.query.address
    // })
})

app.get ('/products', (req, res) => {
    if (!req.query.search) {
        return res.send ({
            error: 'No search term provided.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Kenneth Ng',
        errorMsg: 'Help article not found.'
    })
})

app.get ('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Kenneth Ng',
        errorMsg: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server up and running on port ' + port)
})
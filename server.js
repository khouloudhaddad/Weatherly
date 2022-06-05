const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
 
const apiKey = '57ad6ab2db00ae5d9c9f78f7440f129a';
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
 
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let input = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`
    console.log(req.body.city)
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees with ${weather.weather[0].main} in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
          console.log("body:", body)
        }
      }
    });
})

app.listen(3000, function () {
    console.log('Weatherly app listening on port 3000!')
})
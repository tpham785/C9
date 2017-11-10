var express = require("express");
var request = require('request');
var app = express();
var request = require("request");
app.set("view engine", "ejs");


//request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, response, body) {

// request('http://api.weatherunlocked.com/api/current/51.50,-0.12?app_id=7fc80640&app_key=05c1356485d1ff973371f2b408e5cda3', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Show the HTML for the Google homepage.
//   }
// })

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    request('http://api.weatherunlocked.com/api/current/32.6130,83.6242?app_id=7fc80640&app_key=05c1356485d1ff973371f2b408e5cda3', function (error, response, body) {
     //request('http://api.weatherunlocked.com/api/current/33.1434,117.1661?app_id=7fc80640&app_key=05c1356485d1ff973371f2b408e5cda3', function (error, response, body) {
    //33.1434° N, 117.1661° W
      if (!error && response.statusCode == 200) {
            var parsedData = JSON.parse(body);
            console.log(parsedData["feelslike_f"]);
            res.render("results", {parsedData: parsedData});
      }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Raincheck has started!");
});


//key: 05c1356485d1ff973371f2b408e5cda3
//id:  7fc80640
//api/{LocalWeatherType}/{Location}?app_id={APP_ID}&app_key={APP_KEY}
//{LocalWeatherType} can be current or forecast
//{Location} will be a longitude range
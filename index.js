
const express = require('express')
const path = require('path');
const { URL } = require('url'); 
const fs = require('fs');

// Firebase
const firebase = require("firebase/app");
const db = require("firebase/database");

let rawdata = fs.readFileSync('config.json');
let CONFIG = JSON.parse(rawdata);

// Launch express app
const port = 3000
const app = express()

var pressure = 985
var humidity = 50
var temperature = 273

app.use(express.static("public"));

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var weather_request = new XMLHttpRequest();
var uvi_request = new XMLHttpRequest();
// Set the configuration for your app
var config = {
  apiKey: "apiKey",
  authDomain: "geohealth-962d3.firebaseapp.com",
  databaseURL: "https://geohealth-962d3.firebaseio.com/",
  storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);
var database = firebase.database();

app.listen(port, () => console.log(`App listening on port ${port}!`))


// starCountRef.on('value', function(snapshot) {
//   console.log(snapshot)
  
//   updateStarCount(postElement, snapshot.val());
// });
//var coord = {"lat":112.0, "long":39.0};
params = [['lat',"30"],['lon',"136.1"],['APPID',CONFIG.APPID]]

var weather_url = new URL ("http://api.openweathermap.org/data/2.5/weather");
weather_url.search = new URLSearchParams(params).toString();
weather_request.open("GET", weather_url);
weather_request.onreadystatechange = function() {
  var rev = JSON.parse(this.responseText);
  console.log(rev["main"]);  
 
}
weather_request.send()

var uvi_url = new URL ("http://api.openweathermap.org/data/2.5/uvi");
uvi_url.search = new URLSearchParams(params).toString();
uvi_request.open("GET", uvi_url)
uvi_request.onreadystatechange = function() {
  console.log(this.responseText);
}
uvi_request.send()


const express = require('express')
const path = require('path');
const { URL } = require('url'); 
const {URLSearchParams} = require('url')

const fs = require('fs');

// Firebase
const firebase = require("firebase/app");
const db = require("firebase/database");

let rawdata = fs.readFileSync('config.json');
let CONFIG = JSON.parse(rawdata);

// Launch express app
const port = 3000
const app = express()

var other = false;
var pressure = 985
var humidity = 50
var temperature = 273

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var weather_request = new XMLHttpRequest();
var uvi_request = new XMLHttpRequest();

// Setup firebase
var config = {
  apiKey: "apiKey",
  authDomain: "geohealth-962d3.firebaseapp.com",
  databaseURL: "https://geohealth-962d3.firebaseio.com/",
  storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);
var resp = {"received": false};

function updateScores(dict) {
  let asthma = 0.5*((dict["pressure"] - pressure) / 1.8 + humidity);
  let allergies = 0.5*((dict["temp"] - temperature) * 1.25 + humidity);
  resp["asthma"] = asthma;
  resp["allergies"] = allergies;
  ref.child("asthma").set(asthma);
  ref.child("allergies").set(allergies);
  resp["received"] = true;
}
function getDetails(point) {
  resp["lat"] = point["lat"];
  resp["long"] = point["long"];
  params = [['lat', point["lat"]],['lon',point["long"]],['APPID',CONFIG.APPID]]
  var weather_url = new URL ("http://api.openweathermap.org/data/2.5/weather");
  weather_url.search = new URLSearchParams(params).toString();
  
  weather_request.open("GET", weather_url.href);
  weather_request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let rev = JSON.parse(this.responseText);
      let main = rev["main"];  

      console.log(main);
      updateScores(main);
    }
  }
  weather_request.send()
  
  // var uvi_url = new URL ("http://api.openweathermap.org/data/2.5/uvi");
  // uvi_url.search = new URLSearchParams(params).toString();
  // uvi_request.open("GET", uvi_url.href)
  // uvi_request.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //     var rev = JSON.parse(this.responseText);
  //     console.log(rev);  
  //   }
  // }
  // uvi_request.send()
}

var first = true;
var coord = {}
var database = firebase.database();
var ref = database.ref("/");
var coordLatRef = database.ref("coord/latlong");
coordLatRef.on('value', function(snapshot) {
  if (first) {
    first = !first;
  } else { 
    console.log("sending weather")
    coord = snapshot.val().split(" ");
var ref = database.ref("/");
coord = {"lat": parseFloat(coord[0]), "long": parseFloat(coord[1])}
    console.log(coord);
    res = getDetails(coord);
  }
});

// Setup server
app.use(express.static("public"));
app.listen(port, () => console.log(`App listening on port ${port}!`))

app.get('/reset', function(req, res) {
  console.log("RESET")
  resp = {"received": false}; 
  res.send("reset ack");
});

app.post('/', function(req, res) {
  res.send(resp);
});
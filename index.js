
const express = require('express')
const path = require('path');

const fs = require('fs');

// Firebase
const firebase = require("firebase/app");
const db = require("firebase/database");

let rawdata = fs.readFileSync('config.json');
let CONFIG = JSON.parse(rawdata);

// Launch express app
const port = 3000
const app = express()
app.use(express.static("public"));

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();

// Firebase setup
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
params = [['lat',"30"],['lon',"136.1"],['APPID','app_id_key']]
var url = new URL ("http://api.openweathermap.org/data/2.5/weather");
url.search = new URLSearchParams(params).toString();

request.open("GET", url)
request.onreadystatechange = function() {
  console.log(this.responseText);
}

request.send()

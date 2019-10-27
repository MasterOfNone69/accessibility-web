
const express = require('express')
const path = require('path');
const app = express()
const firebase = require("firebase/app");
const db = require("firebase/database");
const port = 3000;

app.use(express.static("public"));

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();
// Set the configuration for your app
var config = {
  apiKey: "apiKey",
  authDomain: "geohealth-962d3.firebaseapp.com",
  databaseURL: "https://geohealth-962d3.firebaseio.com/",
  storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();


app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/', 'index.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var starCountRef = firebase.database().ref('posts/starCount');
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
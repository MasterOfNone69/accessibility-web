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

var starCountRef = firebase.database().ref('posts/');

starCountRef.on('value', function(snapshot) {
  // write here
});

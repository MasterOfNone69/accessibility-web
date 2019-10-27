const express = require('express')
const path = require('path');
const app = express()
const firebase = require("firebase/app");
const db = require("firebase/database");
const port = 3000

app.use(express.static("public"));

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

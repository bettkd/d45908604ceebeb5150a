//dependancies
var express = require('express');
var bodyParser = require('body-parser');
//var appjs = require('app');

//express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//firebase admin
var admin = require("firebase-admin");
var serviceAccount = require("./bin/STEAMtern-6d4651cfb3a4.json");
if(admin.apps.length == 0) {
	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	  databaseURL: "https://internstem.firebaseio.com"
	});
}


//routes
app.use('/api', require('./routes/api'));
app.use('/', require('./app'))

module.exports = app;
//start server
//app.listen(3000);
//console.log("API is running on port 3000");
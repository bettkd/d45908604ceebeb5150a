var express = require('express');
	router = express.Router();
	crypto = require('crypto');
	date_utils = require('date-utils')
	Firebase = require('firebase');
	ref = new Firebase("https://internstem.firebaseio.com");

viewObj = {
	title: 'InternSTEM Admin'
}

/* GET home page. */
router.get('/', function(req, res) {
	if(ref.getAuth()) {
		return res.redirect('/');
	}

	viewObj.err = null;
	viewObj.email = null;

	res.render('login', viewObj);
});


router.post('/', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	// Create a callback to handle the result of the authentication
	function authHandler(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
			viewObj.err = error;
			viewObj.email = email;
			res.render('login', viewObj)
		} else {
			return res.redirect("/");
	 	}
	}

	ref.authWithPassword({
		email    : email,
		password : password
	}, authHandler);
});

module.exports = router;

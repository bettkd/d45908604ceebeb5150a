var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase'),
	internsRef = new Firebase("https://internstem.firebaseio.com/internships"),
	ref = new Firebase("https://internstem.firebaseio.com");

var viewObj = {
	title: 'STEAMtern Admin'
}

viewObj.internships = null;

/* GET home page. */
router.get('/', function(req, res, next) {

	var authData = ref.getAuth();

	if (authData) {
		
		internsRef.on("value", function(snapshot) {
			viewObj.internships = snapshot.val();
			if (viewObj.internships == null){
				res.redirect('/newinternship')
			}
			res.render('index', viewObj);
		}, function (errorObject) {
			console.log("The read failed...");
		});
	} else {
		res.redirect('/login');
	}
});


module.exports = router;

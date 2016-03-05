var express = require('express');
	router = express.Router();
	Firebase = require('firebase');
	internRef = new Firebase("https://internstem.firebaseio.com/internships");
	ref = new Firebase("https://internstem.firebaseio.com");

viewObj = {
	title: 'InternSTEM Admin'
}

/* GET home page. */
router.get('/', function(req, res, next) {

	var authData = ref.getAuth();

	if (authData) {
		
		internRef.on("value", function(snapshot) {
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

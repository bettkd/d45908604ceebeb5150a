var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase'),
	internsRef = new Firebase("https://internstem.firebaseio.com/internships"),
	ref = new Firebase('https://internstem.firebaseio.com');

var internshipID;

var viewObj = {
	title: 'STEAMtern Admin'
}


viewObj.internships = null;

/* GET view internship page. */
router.get('/', function(req, res, next) {
	var authData = ref.getAuth();

	if (authData) {

		if (req.query.id){
			internshipID = req.query.id;
			viewObj.id = internshipID;

			internsRef.child(internshipID).on("value", function(snapshot) {
				viewObj.internship = snapshot.val();
				if (viewObj.internship == null){
					res.redirect('/newinternship')
				}
				res.render('viewinternship', viewObj);
			}, function (errorObject) {
				console.log("The read failed...");
			});
		}
	} else {
		res.redirect('/login');
	}
});


module.exports = router;
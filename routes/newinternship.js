var express = require('express');
	router = express.Router();
	crypto = require('crypto');
	date_utils = require('date-utils')
	Firebase = require('firebase');
	ref = new Firebase("https://internstem.firebaseio.com");

var viewObj = {
	title: 'STEAMtern Admin'
}

/* GET home page. */
router.get('/', function(req, res) {


	var authData = ref.getAuth();

	if (authData) {
		res.render('newinternship', viewObj);
	} else {
		res.redirect('/login');
	}
});


router.post('/', function(req, res) {

	var internship = {
		name: req.body.name,
		discipline: req.body.discipline || 'N/A',
		institution: req.body.institution || 'N/A',
		city: req.body.city || 'N/A',
		state: req.body.state || 'N/A',
		country: req.body.country || 'N/A',
		description: req.body.description || 'N/A',
		website: req.body.website || 'N/A',
		duration: req.body.duration || 'N/A',
		salary: req.body.salary || 'N/A',
		courses: req.body.courses || 'N/A',
		housing: req.body.housing || 'N/A',
		transportation: req.body.transportation || 'N/A',
		citizenship: req.body.citizenship || ['N/A'],
		minority: req.body.minority || ['NA'],
		classification: req.body.classification || ['N/A'],
		gpa: req.body.gpa || 'N/A',
		statement: (req.body.statement == 'on') ? 'true' : 'false',
		recommendation: req.body.recommendation || '0',
		transcript: (req.body.transcript == 'on') ? 'true' : 'false',
		deadline: req.body.deadline || 'N/A',
		submision: req.body.submision || ['N/A'],
		added: Date.today().toFormat('YYYY-MM-DD')
	}

	var internRef = ref.child('internships');
	var id = crypto.randomBytes(10).toString('hex');
	internRef.child(id).set(internship);
	res.redirect('/');

	console.log(internship)
});

module.exports = router;

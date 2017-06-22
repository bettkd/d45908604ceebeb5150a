var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase'),
	ref = new Firebase('https://internstem.firebaseio.com');

var internshipID;

var viewObj = {
	title: 'STEAMtern Admin'
}

/* GET home page. */
router.get('/', function(req, res, next) {

	var authData = ref.getAuth();

	if (authData) {

		if (req.query.id){
			internshipID = req.query.id;
			viewObj.id = internshipID;
		
			internRef = new Firebase('https://internstem.firebaseio.com/internships/' + internshipID);
			internRef.on('value', function(snapshot) {
				var internship = snapshot.val();
				if (internship == null){
					res.redirect('/')
				}
				viewObj.internship = internship
				res.render('editinternship', viewObj);
			}, function (errorObject) {
				console.log('The read failed...');
			});
		}
	} else {
		res.redirect('/login');
	}
});


router.post('/', function(req, res) {

	var internshipx = {
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
		citizenship: req.body.citizenship.split(',') || ['N/A'],
		minority: req.body.minority.split(',') || ['NA'],
		classification: req.body.classification.split(',') || ['N/A'],
		gpa: req.body.gpa || 'N/A',
		statement: (req.body.statement == 'on') ? 'true' : 'false',
		recommendation: req.body.recommendation || '0',
		transcript: (req.body.transcript == 'on') ? 'true' : 'false',
		deadline: req.body.deadline || 'N/A',
		submision: req.body.submision.split(',') || ['N/A'],
		added: Date.today().toFormat('YYYY-MM-DD')
	}

	console.log('***_++_%$#$^^&*(!@#@$#%^&*%$#%^^%$&^$%!@')
	console.log(internshipx)

	var ID = req.body.id;
	var myRef = new Firebase('https://internstem.firebaseio.com/internships/' + ID);
	myRef.update(internshipx, function(err) {
		if(err){
			throw err;
			res.redirect('/editinternship');
		}
	});
	res.redirect('/');
});

module.exports = router;

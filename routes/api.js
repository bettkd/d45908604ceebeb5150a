//dependancies
const express = require('express');
const router = express.Router();

//models
var User = require('../models/users');
var user = new User();

//routes
router.post('/user/register', (req, res) => {
	var data = { 
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		temppassword: Math.random().toString(36).substring(2),
	};

	user.register.post(data, (error, result)=>{
		if(error){
			res.setHeader('Access-Control-Allow-Methods', 'POST');
    			res.setHeader('Access-Control-Allow-Origin', 'http://www.steamtern.com');
			res.send({'error': error});
		} else {
			res.setHeader('Access-Control-Allow-Methods', 'POST');
    			res.setHeader('Access-Control-Allow-Origin', 'http://www.steamtern.com');
			res.send({'success': result})
		}

	});
});

router.get('/user/count', (req, res) => {
	user.count.get(req, (err, result)=> {
		res.setHeader('Access-Control-Allow-Methods', 'GET');
    		res.setHeader('Access-Control-Allow-Origin', 'http://www.steamtern.com');
		res.send({'value': result});
	});
});


//return router
module.exports = router;

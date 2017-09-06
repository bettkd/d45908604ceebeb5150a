//dependancies
const admin = require("firebase-admin");
const db = admin.database();
const ref = db.ref("users");
const Promise = require("promise");

//methods
function User() {
	var self = this;

	this.register = {
		post: (data, callback)=> {
			admin.auth().createUser({
				email: data.email,
				emailVerified: false,
				password: data.temppassword,
				displayName: data.firstname + ' ' + data.lastname,
				disabled: false,
				//phoneNumber: "+112345678901",
				//photoURL: "http://www.example.com/12345678/photo.png",
			})
			.then((userRecord)=> {
				ref.child(userRecord.uid).set({
					firstname: data.firstname,
					lastname: data.lastname,
					email: userRecord.email,
					temppassword: data.temppassword,
					new: true
				});
				callback(null, userRecord);
			})
			.catch((error)=> {
				callback(error);
			});
		}
	};

	this.count = {
		get: (request, callback) => {
			ref.once('value').then((snap) => {
				const result =  snap.numChildren();
				callback(request, result);
			}, (error)=> {
				callback(error);
			});
		}
	};
};

//return router
module.exports = User;
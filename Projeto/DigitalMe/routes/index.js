var express = require('express');
var router = express.Router();
var models = require('../models/schema')
var Post = models.Post
var User = models.User

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/homepage',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('index',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/homepage',
		failureRedirect: '/signup',
		failureFlash : true  
	}));


	/* Handle ProfileChange POST */
	router.post('/changeprofdata', function(req, res){
		console.log("req.user"+req.user)
		//console.log("req.body.newEmail: "+req.body.newBirth_date)
		var newName = req.user.name
		var newEmail = req.user.email
		var newGender = req.user.gender
		var newBirth_date = req.user.Birth_date
		if(req.body.newName){
			newName = req.body.newName
			
			console.log("req.body.newName"+req.body.newName)
		}
		if(req.body.newEmail){
			newEmail = req.body.newEmail
			console.log(" req.body.newEmail"+ req.body.newEmail)
		}
		if(req.body.newGender){
			newGender = req.body.newGender
			console.log(" req.body.newGender"+ req.body.newGender)
		}
		if(req.body.newBirth_date){
			newBirth_date = req.body.newBirth_date
			console.log(" req.body.newBirth_date"+ req.body.newBirth_date)
		}
		
		var newUser = {
			email: newEmail,
			name: newName,
			gender: newGender,
			birth_date: newBirth_date
		}
		console.log("newUser: "+newUser.email)
		console.log("newUser: "+newUser.name)
		console.log("newUser: "+newUser.gender)
		console.log("newUser: "+newUser.birth_date)
		
		User.update({email: req.user.email},{$set: {email: newEmail,name: newName,gender: newGender,birth_date: newBirth_date}},
				(err, result)=>{
					if(!err){
						console.log('Alterou utilizador!')
						req.user.name = newName
						req.user.email = newEmail
						req.user.gender = newGender
						req.user.birth_date = newBirth_date
					} 
					else console.log("Erro: "+err)
		})
				
		res.redirect('/homepage')
		
		
	});


	/* GET Home Page */
	router.get('/homepage', isAuthenticated, function(req, res){
		Post.find()
		.exec((err,doc)=>{
			if(!err){
				console.log("doc "+doc)
				res.render('homepage', {lposts: doc, user:req.user})
			}
				
			else 
				res.render('error', {error: err})
		})
	});

	/* Handle Logout */
	router.get('/signout', function(req, res, err) {
		req.logOut()
		res.redirect('/')

		//falta apagar a cache
	});

	return router;
}






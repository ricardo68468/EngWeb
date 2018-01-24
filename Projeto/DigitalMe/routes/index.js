
var express = require('express');
var router = express.Router();
var models = require('../models/schema')
var Post = models.Post
var SportPost = models.Sport
var ToughtPost = models.Thought

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

	/* GET Home Page */
	router.get('/homepage', isAuthenticated, function(req, res){
		Post.find()
		.exec((err,doc)=>{
			if(!err) 
				res.render('homepage', {lposts: doc, user:req.user})
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


	router.post('/postDesportivo', (req, res, next)=>{
		// resolver data, distancia, user.name e fazer update ao array de posts do user// resolver data, distancia e user.name
		var date = new Date()
		var sport = new SportPost({post_privacy: req.body.privacy, post_date: date,
			post_type: "Desportivo", posted_in: req.body.sport_local, posted_by: "Joao", sport_type:req.body.sport_type, distance: "10 m",
			calories_burnt: req.body.sport_calories, duration: req.body.sport_duration ,sport_description: req.body.sport_desc,
			post_comments: []})
		
		sport.save((err, result)=>{
			if(!err)
				console.log("Acrescentei desporto: "+ req.body._id.sport_type)
			else
				console.log("Erro: "+err)
		});
		res.redirect('/homepage')
	})

	return router;
}






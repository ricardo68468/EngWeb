import { model } from 'mongoose';

var express = require('express');
var router = express.Router();
var models = require('../models/schema')
var Post = models.Post
var SportPost = models.Sport

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

	router.post('/post', (req, res, next)=>{
		console("Form: "+req.body)
		if("Desporto"){
			var novoPost = new SportPost({_id: req.body._id,post_privacy: req.body.privacy, post_date: "",
										 post_type: req.body.tipo,posted_in:"",posted_by:""})
		}
		
		novoPost.save((err, result)=>{
			if(!err) console.log("Adicionei o post: "+ req.body.tipo)
			else console.log("Erro: "+err)
		});
		res.redirect('/homepage')
	})
	


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

	return router;
}






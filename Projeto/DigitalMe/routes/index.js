
var express = require('express');
var router = express.Router();
var models = require('../models/schema')
var fs = require('fs')
var Post = models.Post
var SportPost = models.Sport
var ToughtPost = models.Thought
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

	router.post('/homepage/post', (req, res, next)=>{
		//console.log("id:::::"+req.body._id)
		var sport = new SportPost({post_privacy: req.body.privacy, post_date: "28/10/2018",
			post_type: "Desportivo", posted_in: req.body.sport_local, posted_by: "Joao", sport_type:req.body.sport_type, distance: "10 m",
			calories_burnt: req.body.sport_calories, duration: req.body.sport_duration ,sport_description: req.body.sport_desc,
			post_comments: []})
		
		sport.save((err, result)=>{
			if(!err)
				console.log("Acrescentei desporto: "+ req.body._id)
			else
				console.log("Erro: "+err)
		});
		res.redirect('/homepage')
	})
	


	/* Handle ProfileChange POST */
	router.post('/homepage/:id/changeprofdata', function(req, res){
		/** @todo por a password e a foto **/
		var newName = req.user.name
		var newEmail = req.user.email
		var newGender = req.user.gender
		var newBirth_date = req.user.birth_date
		var newPassword = req.user.password
		var newImg = req.user.img
		if(req.body.newPassword){
			if(req.body.newPasswordCheck){
				
				newName = req.body.newName
				console.log("req.body.newName"+req.body.newName)
			}
		}
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
		if(req.body.newDate){
			newBirth_date = req.body.newDate
			console.log(" req.body.newBirth_date"+ req.body.newDate)
			a.img.contentType = 'image/png';
		}
		if(req.body.newProfPic){
			console.log("------------------------- profPic = "+req.body.newProfPic)
			newImg.type = fs.readFileSync(__dirname+"/"+req.body.newProfPic)
			newImg.contentType = 'image/png'
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
		console.log("newUser: "+newUser.img)
		
		User.update({email: req.user.email},{$set: {email: newEmail,name: newName,gender: newGender,birth_date: newBirth_date,img:newImg}},
				(err, result)=>{
					if(!err){
						console.log('Alterou utilizador!')
						req.user.name = newName
						req.user.email = newEmail
						req.user.gender = newGender
						req.user.birth_date = newBirth_date
						req.user.img = newImg
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






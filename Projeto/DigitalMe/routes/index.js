
var express = require('express');
var router = express.Router();
var models = require('../models/schema')
var fs = require('fs')
const util = require('util')
var User = models.User
var Post = models.Post
var SportPost = models.Sport
var ToughtPost = models.Thought
var PhotoPost = models.Photo
var VideoPost = models.Video
var CookingPost = models.Cooking
var EventPost = models.Events


/** @todo 
 * Adicionar imagens e videos nos posts
 * Redirecionar os erros para uma página de erro
*/

//multer object creation
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })


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



	/* Handle Registration POST */
	router.post('/homepage/post', upload.array("post"),(req, res, next)=>{
		if(req.body.sport){
			console.log("req.files: "+req.files[0].originalname)
			// multiple
			var photoNames = {
				img: []
			}
			
			for(var i = 0; i<req.files.length;i++){
				photoNames.img[i] = "uploads/"+req.files[i].originalname
			}
			//console.log(util.inspect(req, false, null))
			var date = new Date()
			var sport = new SportPost({post_privacy: req.body.privacy, post_date: date,
			post_type: req.body.sport, posted_in: req.body.sport_local,sport_photos: photoNames.img, posted_by: req.user.name, sport_type:req.body.sport_type, distance: req.body.sport_distance,
			calories_burnt: req.body.sport_calories, duration: req.body.sport_duration ,sport_description: req.body.sport_desc,
			post_comments: []})
			
			sport.save((err, result)=>{
				if(!err)
				{
					console.log("Acrescentei desporto: "+ req.body.sport_type)
					console.log("Id do post: "+sport._id)
					User.update({email: req.user.email},{$push: {user_posts: sport._id}},(err, result)=>{
						if(!err) 
							console.log('Acrescentei o post: '+ sport._id +" ao user: "+req.user.email)
		  				else 
		   					console.log("Erro ao atualizar: "+err)
					})
					res.redirect('/homepage')
				}
				else
					console.log("Erro ao gravar: "+err)
			});
		}
		if(req.body.thought){
			
			var date = new Date()
			var thought = new ToughtPost({post_privacy: req.body.privacy, post_date: date,
			post_type: req.body.thought, posted_in: req.body.thought_local, posted_by: req.user.name,
			thought_text: req.body.thoughtDescription,post_comments: []})

			thought.save((err, result)=>{
				if(!err)
				{
					console.log("Acrescentei um pensamento")
					console.log("Id do post: "+thought._id)
					User.update({email: req.user.email},{$push: {user_posts: thought._id}},(err, result)=>{
						if(!err) 
							console.log('Acrescentei o post: '+ thought._id +" ao user: "+req.user.email)
		  				else 
		   					console.log("Erro ao atualizar: "+err)
					})
					res.redirect('/homepage')
				}
				else
					console.log("Erro ao gravar: "+err)
			});
		}
		if(req.body.foto){
			console.log("POST PHOTO")
			console.log("req.files: "+req.files[0].originalname)
			// multiple
			var photoNames = {
				img: []
			}
			
			for(var i = 0; i<req.files.length;i++){
				photoNames.img[i] = "uploads/"+req.files[i].originalname
			}
			var date = new Date()
			console.log("req.user.img: "+req.user.img)
			var foto = new PhotoPost({post_privacy: req.body.privacy, post_date: date,posted_by_pic: req.user.img,
			post_type: req.body.foto, posted_in: req.body.fotoLocal, posted_by: req.user.name, img: photoNames.img,
			photo_description: req.body.fotoDescription, post_comments: []})
		
			foto.save((err, result)=>{
				if(!err)
				{
					console.log("Acrescentei uma foto")
					console.log("Id do post: "+foto._id)
					User.update({email: req.user.email},{$push: {user_posts: foto._id}},(err, result)=>{
						if(!err) 
							console.log('Acrescentei o post: '+ foto._id +" ao user: "+req.user.email)
		  				else 
		   					console.log("Erro ao atualizar: "+err)
					})
					res.redirect('/homepage')
				}
				else
					console.log("Erro ao gravar: "+err)
			});
		}
		if(req.body.video){

			// single
			var photoNames = {
				img: []
			}
			
			for(var i = 0; i<req.files.length;i++){
				photoNames.img[i] = "uploads/"+req.files[i].originalname
			}
			var date = new Date()
			var video = new VideoPost({post_privacy: req.body.privacy, post_date: date,
			post_type: req.body.video, posted_in: req.body.videoLocal, posted_by: req.user.name, video: "uploads/"+req.files[0].originalname,
			video_description: req.body.videoDescription, post_comments: []})
		
			video.save((err, result)=>{
				if(!err)
				{
					console.log("Acrescentei um video")
					console.log("Id do post: "+video._id)
					User.update({email: req.user.email},{$push: {user_posts: video._id}},(err, result)=>{
						if(!err) 
							console.log('Acrescentei o post: '+ video._id +" ao user: "+req.user.email)
		  				else 
		   					console.log("Erro ao atualizar: "+err)
					})
					res.redirect('/homepage')
				}
				else
					console.log("Erro ao gravar: "+err)
			});
		}
		if(req.body.recipe){

			// multiple
			console.log("req.files: "+req.files[0].originalname)
			var photoNames = {
				img: []
			}
			
			for(var i = 0; i<req.files.length;i++){
				photoNames.img[i] = "uploads/"+req.files[i].originalname
			}
			var date = new Date()
			var recipe = new CookingPost({post_privacy: req.body.privacy, post_date: date,
			post_type: req.body.recipe, posted_in: req.body.cookLocal, cook_name: req.body.recipe_name,cook_photos: photoNames.img,
			ingredients: req.body.ingredients, preparation: req.body.recipeDescription, posted_by: req.user.name,
			post_comments: []})
		
			recipe.save((err, result)=>{
				if(!err)
				{
					console.log("Acrescentei uma receita")
					console.log("Id do post: "+thought._id)
					User.update({email: req.user.email},{$push: {user_posts: recipe._id}},(err, result)=>{
						if(!err) 
							console.log('Acrescentei o post: '+ recipe._id +" ao user: "+req.user.email)
		  				else 
		   					console.log("Erro ao atualizar: "+err)
					})
					res.redirect('/homepage')
				}
				else
					console.log("Erro ao gravar: "+err)
			});
		}
		if(req.body.event){
			// multiple
			console.log("req.files: "+req.files[0].originalname)
			var photoNames = {
				img: []
			}
			
			for(var i = 0; i<req.files.length;i++){
				photoNames.img[i] = "uploads/"+req.files[i].originalname
			}
			
			var date = new Date()
			var event = new EventPost({post_privacy: req.body.privacy, post_date: date,
				event_photos: photoNames.img,event_video:req.file.filename,
				post_type: req.body.event, posted_in: req.body.event_local,
				posted_by: req.user.name, event_name: req.body.event_name,
				event_type: req.body.event_type, event_description: req.body.event_desc,
				event_date: req.body.event_date ,event_duration: req.body.event_duration,
				event_hour: req.body.event_hour,post_comments: []})
				
			event.save((err, result)=>{
				if(!err)
				{
					console.log("Acrescentei um evento")
					console.log("Id do post: "+event._id)
					User.update({email: req.user.email},{$push: {user_posts: event._id}},(err, result)=>{
						if(!err) 
							console.log('Acrescentei o post: '+ event._id +" ao user: "+req.user.email)
		  				else 
		   					console.log("Erro ao atualizar: "+err)
					})
					res.redirect('/homepage')
				}
				else
					console.log("Erro ao gravar: "+err)
			});
		}
	})

	/* Handle Comment on some post */
	router.post('/homepage/post/:idPost/comment', (req, res, next)=>{
		var comment = {comment_date: req.body.comment_date, comment_body: req.body.comment_body, comment_by: req.user.name}
		Post.update({_id: req.params.idPost},{$push: {post_comments:comment}},
			(err,result)=>{
				if(!err)
					console.log("Adicionei um comment ao post: "+ req.params.idPost)
				else
					console.log('Erro a adicionar comentário: '+ err)
			})
		res.redirect('/homepage')
	})
	


	/* Handle ProfileChange POST */
	router.post('/homepage/:id/changeprofdata', upload.single('newProfPic'), function(req, res){
		/** @todo por a password e a foto **/

		console.log("PROFILE CHANGE")
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
		if(req.file.filename){
			console.log("------------------------- profPic = "+req.file.filename)
			newImg = "uploads/"+req.file.filename
			newImg.contentType = 'image/png'
		}


		
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
				//console.log("req.file.filename: "+req.file.filename)
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






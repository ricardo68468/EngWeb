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
var storage = multer.diskStorage(
	{
    destination: function (req, file, cb) {
		if(file.originalname){
			cb(null, 'public/uploads/')
		}else{
			console.log("NO FILES SELECTED")
		}
    },
    filename: function (req, file, cb) {
		if(file.originalname){
			cb(null, file.originalname)
		}else{
			console.log("NO FILES SELECTED")
		}
        
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

	// filter thoughts
	router.get('/homepage/thoughts', isAuthenticated, function(req,res){
		console.log("Thoughts")
		Post.find({post_type:"0"}).where({post_privacy:"pub"}).sort({post_date: -1}).exec((err,doc)=>{
			if(!err){
				res.render('homepage', {lposts: doc, user:req.user})
			}	
			else 
				res.render('error', {error: err})
		})
	})

	// filter pics
	router.get('/homepage/pics', isAuthenticated, function(req,res){
		Post.find({post_type:"1"}).where({post_privacy:"pub"})
		.sort({post_date: -1}).exec((err,doc)=>{
			if(!err){
				res.render('homepage', {lposts: doc, user:req.user})
			}	
			else 
				res.render('error', {error: err})
		})
	})
	
	// filter videos
	router.get('/homepage/videos', isAuthenticated, function(req,res){
		console.log("Videos")
		Post.find({post_type:"2"}).where({post_privacy:"pub"}).sort({post_date: -1}).exec((err,doc)=>{
			if(!err){
				//console.log("doc "+doc)
				res.render('homepage', {lposts: doc, user:req.user})
			}	
			else 
				res.render('error', {error: err})
		})
	})

	// filter sports
	router.get('/homepage/sports', isAuthenticated, function(req,res){
		console.log("Sports")
		Post.find({post_type:"3"}).where({post_privacy:"pub"}).sort({post_date: -1}).exec((err,doc)=>{
			if(!err){
				res.render('homepage', {lposts: doc, user:req.user})
			}	
			else 
				res.render('error', {error: err})
		})
	})

	// filter recipes
	router.get('/homepage/recipes', isAuthenticated, function(req,res){
		console.log("Recipes")
		Post.find({post_type:"4"}).where({post_privacy:"pub"}).sort({post_date: -1}).exec((err,doc)=>{
			if(!err){
				res.render('homepage', {lposts: doc, user:req.user})
			}	
			else 
				res.render('error', {error: err})
		})
	})

	// filter events
	router.get('/homepage/events', isAuthenticated, function(req,res){
		console.log("Events")
		Post.find({post_type:"5"}).where({post_privacy:"pub"}).sort({post_date: -1}).exec((err,doc)=>{
			if(!err){
				res.render('homepage', {lposts: doc, user:req.user})
			}	
			else 
				res.render('error', {error: err})
		})
	})

	// filter myposts
	router.post('/homepage/myposts', isAuthenticated, function(req,res){
		switch(req.body.privacy){
			case "priv":
				// filter mypriv
				console.log("MyPriv")
				Post.find().where({post_privacy:"priv",posted_by_id: req.user._id}).sort({post_date: -1}).exec((err,doc)=>{
					if(!err){
						res.render('homepage', {lposts: doc, user:req.user})
					}	
					else 
						res.render('error', {error: err})
				})
				break
			case "pub":
				// filter mypub
				console.log("MyPub")
				Post.find().where({post_privacy:"pub",posted_by_id: req.user._id}).sort({post_date: -1}).exec((err,doc)=>{
					if(!err){
						res.render('homepage', {lposts: doc, user:req.user})
					}	
					else 
						res.render('error', {error: err})
				})
				
				break
			case "all":
				console.log("MyAll")
				Post.find().where({posted_by_id: req.user._id}).sort({post_date: -1}).exec((err,doc)=>{
					if(!err){
						res.render('homepage', {lposts: doc, user:req.user})
					}	
					else 
						res.render('error', {error: err})
				})
				break
			default:
				console.log("ignore case")
		}
	})

	



	/* Handle submitPost POST */
	router.post('/homepage/post', isAuthenticated, upload.array("post"),(req, res, next)=>{
		if(req.body.sport){
			// multiple
			console.log("SPORT POST")
			var photoNames = {
				img: []
			}
			if(req.files.length){
				
				for(var i = 0; i<req.files.length;i++){
					photoNames.img[i] = "uploads/"+req.files[i].originalname
				}
			}
			
			var date = new Date()
			var sport = new SportPost({post_privacy: req.body.privacy, post_date: date,posted_by_id: req.user._id,
			post_type: req.body.sport, posted_in: req.body.sport_local,sport_photos: photoNames.img,
			posted_by: req.user.name, sport_type:req.body.sport_type, distance: req.body.sport_distance,
			calories_burnt: req.body.sport_calories, duration: req.body.sport_duration ,
			sport_description: req.body.sport_desc, posted_by_pic: req.user.img,
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
			var thought = new ToughtPost({post_privacy: req.body.privacy, post_date: date,posted_by_id: req.user._id,
			post_type: req.body.thought, posted_in: req.body.thought_local, posted_by: req.user.name,
			thought_text: req.body.thoughtDescription, posted_by_pic: req.user.img, post_comments: []})

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
			
			// multiple
			var photoNames = {
				img: []
			}
			if(req.files.length){
				console.log("req.files: "+req.files[0].originalname)
				for(var i = 0; i<req.files.length;i++){
					photoNames.img[i] = "uploads/"+req.files[i].originalname
				}
			}
			
			var date = new Date()
			var foto = new PhotoPost({post_privacy: req.body.privacy, post_date: date,posted_by_id: req.user._id,
			post_type: req.body.foto, posted_in: req.body.fotoLocal, posted_by: req.user.name, img: photoNames.img,
			photo_description: req.body.fotoDescription, posted_by_pic: req.user.img, post_comments: []})
		
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
			var date = new Date()
			var video = new VideoPost({post_privacy: req.body.privacy, post_date: date,posted_by_id: req.user._id,
			post_type: req.body.video, posted_in: req.body.videoLocal, posted_by: req.user.name, video: "uploads/"+req.files[0].originalname,
			video_description: req.body.videoDescription, posted_by_pic: req.user.img, post_comments: []})
		
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
			var photoNames = {
				img: []
			}
			if(req.files.length){
				console.log("req.files: "+req.files[0].originalname)
				for(var i = 0; i<req.files.length;i++){
					photoNames.img[i] = "uploads/"+req.files[i].originalname
				}
			}
			
			var date = new Date()
			var recipe = new CookingPost({post_privacy: req.body.privacy, post_date: date,posted_by_id: req.user._id,
			post_type: req.body.recipe, posted_in: req.body.cookLocal, cook_name: req.body.recipe_name,cook_photos: photoNames.img,
			ingredients: req.body.ingredients, preparation: req.body.recipeDescription, posted_by: req.user.name, posted_by_pic: req.user.img,
			post_comments: []})
		
			recipe.save((err, result)=>{
				if(!err)
				{
					console.log("Acrescentei uma receita")
					console.log("Id do post: "+recipe._id)
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
			var photoNames = {
				img: []
			}
			if(req.files.length){
				console.log("req.files: "+req.files[0].originalname)
				for(var i = 0; i<req.files.length;i++){
					photoNames.img[i] = "uploads/"+req.files[i].originalname
				}
			}
			
			
			var date = new Date()
			var event = new EventPost({post_privacy: req.body.privacy, post_date: date,
				event_photos: photoNames.img,posted_by_id: req.user._id,
				post_type: req.body.event, posted_in: req.body.event_local,
				posted_by: req.user.name, event_name: req.body.event_name,
				event_type: req.body.event_type, event_description: req.body.event_desc,
				event_date: req.body.event_date ,event_duration: req.body.event_duration, posted_by_pic: req.user.img,
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
	router.post('/homepage/post/:idPost/comment', isAuthenticated, (req, res, next)=>{
		var date = new Date();
		var comment = {comment_date: date, comment_body: req.body.comment_body, comment_by: req.user.name, comment_by_pic: req.user.img, comment_by_id: req.user._id}
		Post.update({_id: req.params.idPost},{$push: {post_comments:comment}},
			(err,result)=>{
				if(!err)
					console.log("Adicionei um comment ao post: "+ req.params.idPost)
				else
					console.log('Erro a adicionar comentário: '+ err)
			})
		res.redirect('/homepage')
	})

	
	// change privacy
	router.post("/changeprivacy/:idPost", isAuthenticated, function(req,res){
		console.log("MyPriv")
		Post.update({_id: req.params.idPost},{$set: {post_privacy:req.body.privacy}},
		(err,result)=>{
			if(!err){
				console.log("alterou privacidade: "+ req.params.idPost)
				res.redirect('/homepage')
			}
			else{
				console.log('Erro ao alterar privacidade: '+ err)
			}
		})
	})

	// delete post
	router.post("/deletepost/:idPost", isAuthenticated, function(req,res){
		console.log("MyPriv")
		Post.remove({_id: req.params.idPost},(err)=>{
			if(!err){
				console.log("post removed:"+ req.params.idPost)
				res.redirect('/homepage')
			}
			else{
				console.log('Erro ao remover: '+ err)
			}
		})
	})

	


	/* Handle ProfileChange POST */
	router.post('/homepage/:id/changeprofdata', isAuthenticated, upload.array('newProfPic',1), function(req, res){


		console.log("PROFILE CHANGE")
		var newName = req.user.name
		var newEmail = req.user.email
		var newGender = req.user.gender
		var newBirth_date = req.user.birth_date
		var newPassword = req.user.password
		var newImg = req.user.img
		// single
		if(req.files.length){
			console.log("req.files: "+req.files[0].originalname)
			newImg = "uploads/"+req.files[0].originalname
		}
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
		
		/** Update user information */
		User.update({email: req.user.email},{$set: {email: newEmail,name: newName,gender: newGender,birth_date: newBirth_date,img:newImg}},
				(err, result)=>{
					if(!err){
						console.log('Alterou utilizador!')
						req.user.name = newName
						req.user.email = newEmail
						req.user.gender = newGender
						req.user.birth_date = newBirth_date
						req.user.img = newImg
						
						Post.update({'_id': {$in: req.user.user_posts},},{$set: {posted_by: newName, posted_by_pic: newImg }},{multi: true})
						.exec((err,doc)=>{
							if(!err){
								console.log("Update aos post do user: "+ req.user._id)
								
								Post.update({posted_by_id: req.user._id},
									{$set: {"post_comments.0.comment_by": newName, "post_comments.0.comment_by_pic": newImg}},{multi:true})
									.exec((err,doc)=>{
										if(!err)
											console.log("Tudo bem"+doc)
										else
											console.log("Tudo mal"+err)
									})
								
							}	
							else 
								console.log("Erro fio da puta "+err)							
						})
					} 
					else console.log("Erro: "+err)
		})
				
		res.redirect('/homepage')

	});


	/* GET Home Page */
	router.get('/homepage', isAuthenticated, function(req, res){
		Post.find({post_privacy: 'pub'})
		.sort({post_date: -1})
		.exec((err,doc)=>{
			if(!err){
				//console.log("doc "+doc)
				
				res.render('homepage', {lposts: doc, user:req.user})
			}
				
			else 
				res.render('error', {error: err})
		})
	});

	/* Handle Logout */
	router.get('/signout', isAuthenticated, function(req, res, err) {
		req.logOut()
		res.redirect('/')

		//falta apagar a cache
	});
	return router;
}






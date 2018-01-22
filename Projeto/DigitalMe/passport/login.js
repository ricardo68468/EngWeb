var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models/schema');
var bCrypt = require('bcrypt-nodejs');
var User = models.User;

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true,
            usernameField: 'email'
        },
        function(req, email, password, done) { 
            // check in mongo if a user with name exists or not
            User.findOne({ 'email' :  email }, 
                function(err, user) {
                    console.log("entrou no teste de login")
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // name does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with name '+email);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}
var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models/schema');
var bCrypt = require('bcrypt-nodejs');
var User = models.User;

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true, // allows us to pass back the entire request to the callback
            usernameField: 'email'
        },
        function(req, email, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided name
                User.findOne({'email' : email}, function(err, user){
                    // In case of any error, return using the done method
                    
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with name: '+email);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        console.log("req ===== "+req.body.name)
                        //console.log("req params"+req.params)
                        // set the user's local credentials
                        newUser.name = req.body.name
                        newUser.password = createHash(password)
                        newUser.email = email
                        newUser.gender = req.body.gender
                        newUser.birth_date = req.body.birth_date
                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
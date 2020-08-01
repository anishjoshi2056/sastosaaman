const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
User.findById(id).then(function(user){
    done(null,user);
});

})
passport.use(new GoogleStrategy({
    //option for the google strategy
    callbackURL:'/auth/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
},function(accessToken,refreshToken,profile,done){
    //check for the user
    User.findOne({googleid:profile.id}).then(function(currentUser){
        if(currentUser){
            //user is already exist
            console.log('current user ' + currentUser);
            done(null,currentUser);
        }else {
            //user doesn't exist
            new User({
                username:profile.displayName,
                googleid:profile.id,
                photo:profile.photos[0].value
            }).save().then(function(newUser){
                console.log('new user ' + newUser);
                done(null,newUser);
            })
        }
    })
})
);
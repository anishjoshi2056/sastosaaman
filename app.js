const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverrirde = require('method-override');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
// const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const authCheck = function(req,res,next) {
    if(!req.user){
        res.redirect('/auth/google')
    }else {
        next();
    }
}



app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));

mongoose.connect('mongodb://localhost:27017/secondhand',{useNewUrlParser:true,useUnifiedTopology:true});

//Passport configuration
app.use(require('express-session')({
    secret:keys.session.secret,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

//adding routes for the authetication
app.use('/auth',authRoutes);
// app.use('/profile',profileRoutes);
//homepage route
app.get('/',(req,res)=>{
    res.render('homepage',{currentUser:req.user})
})

app.get('/items',authCheck,function(req,res) {
    console.log(req.user)
    res.render('secondhand/index',{currentUser:req.user});
})

app.listen('3000',()=> {
    console.log('server started');
})
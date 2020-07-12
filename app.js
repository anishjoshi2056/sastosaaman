const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverrirde = require('method-override');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

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

app.use('/auth',authRoutes);
//homepage route
app.get('/',(req,res)=>{
    res.render('homepage')
})

app.get('/items',function(req,res) {
    res.render('secondhand/index');
})

app.listen('3000',()=> {
    console.log('server started');
})
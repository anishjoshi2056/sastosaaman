const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverrirde = require('method-override');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const authCheck = require('./config/middlewareforoauth');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const seedDB = require('./seeds');
//====================================================
//Importing routes
var saamaanRoutes = require('./routes/saamaan-routes');
//====================================================
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));
//====================================================
//initializing mongodb
mongoose.connect('mongodb://localhost:27017/secondhand',{useNewUrlParser:true,useUnifiedTopology:true});
//====================================================
//Passport configuration
app.use(require('express-session')({
    secret:keys.session.secret,
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
//====================================================
//currentUser is avaliable to all the ejs files
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})
//====================================================
//using seedDB for default purpose
seedDB();
//====================================================
//Routes
//adding routes for the authetication
app.use('/auth',authRoutes);
app.use('/saamaan',saamaanRoutes);
//homepage route
app.get('/',(req,res)=>{
    res.render('homepage')
})
// app.get('/items',authCheck,function(req,res) {
//     console.log(req.user)
//     res.render('secondhand/index');
// })
//====================================================
app.listen('3000',()=> {
    console.log('server started');
})
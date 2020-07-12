const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverrirde = require('method-override');
const passport = require('passport');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));

mongoose.connect('mongodb://localhost:27017/secondhand',{useNewUrlParser:true,useUnifiedTopology:true});

//homepage route
app.get('/',(req,res)=>{
    res.render('homepage')
})


app.listen('3000',()=> {
    console.log('server started');
})
const express = require('express');
const router = express.Router();
const Saamaan = require('../models/saamaan-model');
const authCheck = require('../config/middlewareforoauth');

//Routes for Saamaan page
router.get('/',function(req,res){
    Saamaan.find({},function(err,allSaamaans){
        if(err){
            console.log(err);
        }else{
            res.render('secondhand/index',{Saamaans:allSaamaans});
        }
    })
})
//Route for a new form(new.ejs)
router.get('/new',authCheck,function(req,res){
    //Rendering new.ejs(to get a form)
    res.render('secondhand/new');
})
router.post('/',authCheck,function(req,res){
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.desc;
    var price = req.body.price;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newSaamaan = {
        name:name,
        img:img,
        desc:desc,
        price:price,
        author:author
    }
    //Create a new campground and save into the database
    Saamaan.create(newSaamaan,function(err,newlySaamaan){
        if(err){
            console.log(err);
        }else{
            //redirect back to default index page
            res.redirect('/saamaan');
        }
    })
})
// For more information
router.get('/:id',function(req,res){
    Saamaan.findById(req.params.id,function(err,foundSaamaan){
        if(err){
            console.log(err);
        }else {
            res.render('secondhand/show',{foundSaamaan:foundSaamaan})
        }
    })
    
})
module.exports = router;
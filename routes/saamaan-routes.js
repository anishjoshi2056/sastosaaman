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
module.exports = router;
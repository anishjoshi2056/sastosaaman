const Saamaan = require('../models/saamaan-model');
const authCheck = function(req,res,next) {
    if(!req.user){
        res.redirect('/auth/google')
    }else {
        next();
    }
}

module.exports = authCheck;
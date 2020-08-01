const Saamaan = require('../models/saamaan-model');
//for original author
function originalauthor(req,res,next){
    if(req.user){
        Saamaan.findById(req.params.id,function(err,foundSaamaan){
            if(err){
                res.redirect('back');
            }else{
                //and check whether the foundCampground author'id is equal to req.user._id(for original author)
                if(foundSaamaan.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect('back');
                }
            }
        })
    }
}
module.exports = originalauthor;
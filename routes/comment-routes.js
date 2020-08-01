const express = require('express');
const router = express.Router({mergeParams:true});
const Saamaan = require('../models/saamaan-model');
const Comment = require('../models/comment-model');
//for adding a new comment we need two routes get(render form page) post
// app.use('/campground/:id/comments',commentRoutes);
router.get('/new',function(req,res){
    Saamaan.findById(req.params.id,function(err,foundSaamaanforcomment){
        if(err){
            console.log(err);
        }else {
            res.render('comments/new',{foundSaamaanforcomment:foundSaamaanforcomment});
        }
    })
})
router.post('/',isLoggedIn,function(req,res){
    //Find the specific see more page of specific id
    Saamaan.findById(req.params.id,function(err,foundSaamaan){
        if(err){
            console.log(err);
        }else {
            //create the comment
            Comment.create(req.body.comment,function(err,commentCreated){
                if(err){
                    console.log(err);
                }else{
                    //add username and id to comment
                    console.log(req.user);
                    commentCreated.author.id = req.user._id;
                    commentCreated.author.username = req.user.username;
                    commentCreated.author.photo = req.user.photo;
// ============================photo to be added========================
                    //save comment
                    commentCreated.save()
                    foundSaamaan.comments.push(commentCreated);
                    foundSaamaan.save();
                    res.redirect('/saamaan/' + req.params.id)
                    console.log("Comment is successfully added");
                }
            })
        }
    })
});
//now we have to do same for the comment(rendering edit form)
router.get('/:comment_id/edit',originalcommentAuthor,function(req,res){
    //find the comment by the help of comment id
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect('back');
        }else{
            res.render('comments/edit',{SaamaanID:req.params.id,foundComment:foundComment});
        }
    })
  
})
//edit comment logic(update Route)
router.put('/:comment_id',originalcommentAuthor,function(req,res){
    //find the Comment by using comment_id and update it
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/saamaan/' + req.params.id);
        }
    })
})
//for delete route
router.delete('/:comment_id',originalcommentAuthor,function(req,res){
    //find the Comment by comment_id and delete it
    Comment.findByIdAndRemove(req.params.comment_id,function(err,deletedCommet){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/saamaan/' + req.params.id);
        }
    });
});
//Middle ware
function isLoggedIn(req,res,next) {
    if(!req.user){
        res.redirect('/auth/google')
    }else {
        next();
    }
}
//writing a middle ware for original author
function originalcommentAuthor(req,res,next){
    if(req.user){
        //find Comment and check the comment's author's id and current loggedin user's id
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect('back');
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{  
                    res.redirect('back')
                }
            }
        })
    }else{
        res.redirect('back');
    }
}

module.exports = router;
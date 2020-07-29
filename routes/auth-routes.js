const router = require('express').Router();
const passport = require('passport');

//oauth with goole
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))
//google redirect
router.get('/google/redirect',passport.authenticate('google'),function(req,res) {
    //redirecting the url
    res.redirect('/saamaan');
})
router.get('/logout',function(req,res){
    req.logOut();
    res.redirect('/')
})
module.exports = router;
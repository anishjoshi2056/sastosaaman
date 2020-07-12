const router = require('express').Router();
const passport = require('passport');


router.get('/login',function(req,res){
    res.send('logged in');
})

router.get('/logout',function(req,res){
    res.send('logged out');
})

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))
//google redirect
router.get('/google/redirect',passport.authenticate('google'),function(req,res) {
    res.send(req.user);
})
module.exports = router;
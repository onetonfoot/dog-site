const router = require('express').Router();



router.get('/', (req, res) => {
// loggedIn: req.isAuthenticated(),
    res.render('home',{  messages: req.flash('info') });
});

router.get('/profile',(req,res)=>{

    res.render('profile')

})

module.exports = router;

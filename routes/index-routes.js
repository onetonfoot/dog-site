const router = require('express').Router();



router.get('/', (req, res) => {
// loggedIn: req.isAuthenticated(),
    res.render('home',{loggedIn: req.isAuthenticated(),  messages: req.flash('info') });
});

router.get('/profile',(req,res)=>{

    res.render('profile',{loggedIn: req.isAuthenticated()})

})

module.exports = router;

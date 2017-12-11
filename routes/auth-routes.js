const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', {
        layout: 'login'
    });
});

// auth logout
router.get('/logout', (req, res) => {

    req.session.destroy( (err) => {
        console.log("logouted")
        if (err){console.log(err)}
        res.redirect('/auth/login'); //Inside a callback… bulletproof!
    })
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});


//Facebook
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/');
});

//Twitter

router.get('/twitter', passport.authenticate('twitter', {
    scope: ['email']
}));

router.get('/twitter/redirect', passport.authenticate('twitter'), (req, res) => {
    res.redirect('/');
});

//Github

router.get('/github', passport.authenticate('github'
));

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    res.redirect('/');
});


module.exports = router;
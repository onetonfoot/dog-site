const router = require('express').Router();
const Dog = require('../models/dog-model');


router.get('/', (req, res) => {
// loggedIn: req.isAuthenticated(),
    res.render('home',{loggedIn: req.isAuthenticated(),  messages: req.flash('info') });
});

router.get('/profile',(req,res)=>{
    res.render('profile',{loggedIn: req.isAuthenticated()})
})


router.get('/:dogID', (req,res)=>{
    Dog.findOne({_id: req.params.dogID}).then( (dog)=>{
        if (typeof req.user === "undefined") {
            res.render('dog-page-public');
        } else {
            if (req.user._id == dog.ownerID) {
                res.render('dog-page',{loggedIn: req.isAuthenticated()});
            } else {
                res.render('dog-page-public-loggedin',{loggedIn: req.isAuthenticated()});
            }
        }
    })
})

module.exports = router;

const router = require('express').Router();
const Dog = require('../models/dog-model');


router.get('/', (req, res) => {
// loggedIn: req.isAuthenticated(),
    res.render('home',{loggedIn: req.isAuthenticated(),  messages: req.flash('info') });
});

router.get('/profile',(req,res)=>{
    res.render('profile',{loggedIn: req.isAuthenticated()})
})


router.get('/:dogID',(req,res)=>{
    Dog.findOne({_id: req.params.dogID}).then( (dog)=>{
        res.render('dog-page-public')
    })
})

module.exports = router;

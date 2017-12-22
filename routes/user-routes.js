const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/user-model')

router.use(bodyParser.urlencoded());

// Get user's private profile page 
router.get('/profile', (req, res) => {
    console.log(req.user);
    User.findOne({_id: req.user._id}, {userID: 0, __v: 0}).then(data => {
        console.log(data);
        res.send(data);
    }).catch(()=>{
        res.send('Profile not found')
    });
})

// Get the view of a user public page render
router.get('/:userID', (req, res) => {
    User.findOne({_id: req.params.userID}, {_id: 1, username: 1, dogIDs: 1, reviews: 1, photos: 1, description: 1}).then(user => {
        res.render('profile-public', {loggedIn: req.isAuthenticated(), user})
    }).catch(() => {
        res.send('User not found')
    });
});

router.get('/:userID' + '/public', (req, res) => {
    User.findOne({_id: req.params.userID}, {userID: 0, __v: 0}).then(user => {
        res.send(user);
    }).catch(()=> {
        res.send('User not found')
    })
})



// Update user's information after logged in
router.put('/information', (req, res) => {
    User.findOneAndUpdate({_id: req.session.passport.user}, {username: req.body.user_name, description: req.body.user_des}, {new: true}).then(data=> {
        res.send(data);
    })
})

module.exports = router;
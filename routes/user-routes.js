const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/user-model')

router.use(bodyParser.urlencoded());

// Get the view of a user public information
// router.get('/:userID', (req, res) => {
//     User.findOne({_id: req.params.userID}, {userID: 0, __v: 0}).then(user => {
//         if (user) {
//             res.render('profile', {user})
//         } else {
//             res.send('User not found')
//         }
//     });
// });

// Get user's private profile page 
router.get('/profile', (req, res) => {
    User.findOne({_id: req.user._id}, {userID: 0, __v: 0}).then(data => {
        res.send(data);
    });
})

// Update user's information after logged in
router.put('/information', (req, res) => {
    User.findOneAndUpdate({_id: req.session.passport.user}, {username: req.body.user_name, description: req.body.user_des}, {new: true}).then(data=> {
        res.send(data);
    })
})

module.exports = router;
const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/user-model')

router.use(bodyParser.json());

// Get the view of a user information
router.get('/:userID', (req, res) => {
    User.findOne({_id: req.params.userID}, {userID: 0, __v: 0}).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.send('User not found')
        }
    });
});

module.exports = router;
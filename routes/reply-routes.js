const router = require('express').Router();
const bodyParser = require('body-parser');
const Reply = require('../models/reply-model')

router.use(bodyParser.json());

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
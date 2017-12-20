const router = require('./auth-routes');
const Review = require('../models/review-model');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.post('/:dogID', (req, res) => {
    let newReivew = new Review({
        
    })
});

module.exports = router;
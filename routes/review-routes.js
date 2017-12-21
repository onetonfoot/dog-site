const router = require('./auth-routes');
const Review = require('../models/review-model');
const Dog = require('../models/dog-model');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:dogID', (req, res) => {
    Dog.findOne({_id: req.params.dogID}).then(dog=>{
        Review.find({_id: dog.reviews}).then(reviews=>{
            if (reviews.length === 0) {
                res.send('No review on ' + req.params.dogID + ' yet');
            } else {
                res.send(reviews);
            }
        });
    }).catch(()=>{
        res.send('No such dog');
    });
});

router.post('/:dogID', (req, res) => {
    let newReview = new Review({
        rating: req.body.rating,
        author: req.user._id,
        text: req.body.text,
        date: new Date(),
    })

    newReview.save().then(()=>{
        Dog.findOneAndUpdate({_id: req.params.dogID}, {$push: {reviews: newReview._id}}, {new: true}).then(dog => {
            Review.find({_id: dog.reviews}).then(reviews => {
                res.send(reviews);
            })
        });
    });
});

module.exports = router;
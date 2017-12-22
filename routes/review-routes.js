const router = require('./auth-routes');
const Review = require('../models/review-model');
const Dog = require('../models/dog-model');
const User = require('../models/user-model');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:dogID', (req, res) => {
    Dog.findOne({ _id: req.params.dogID }).then(dog => {
        Review.find({ _id: dog.reviews }).then(reviews => {
            let copy = reviews.map(review => {
                return new Promise((resolve, reject) => {
                    let reviewCopy = review.toObject();
                    User.findOne({ _id: reviewCopy.author }).then(user => {
                        reviewCopy.authorName = user.username;
                        reviewCopy.authorPhoto = user.photos;
                        resolve(reviewCopy);
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            });

            if (reviews.length === 0) {
                res.send('No review on ' + req.params.dogID + ' yet');
            } else {
                Promise.all(copy).then(c => {
                    res.send(c);
                })
            }
        });
    }).catch(() => {
        res.send('No such dog');
    });
});

router.get('/user/:userID', (req, res) => {
    User.findOne({ _id: req.params.userID }).then(user => {
        Review.find({ _id: user.reviews }).then(reviews => {
            console.log(reviews);
            let copy = reviews.map(review => {
                return new Promise((resolve, reject) => {
                    let reviewCopy = review.toObject();
                    User.findOne({ _id: reviewCopy.author }).then(user => {
                        reviewCopy.authorName = user.username;
                        reviewCopy.authorPhoto = user.photos;
                        resolve(reviewCopy);
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            });

            if (reviews.length === 0) {
                res.send('No review on ' + req.params.userID + ' yet');
            } else {
                Promise.all(copy).then(c => {
                    res.send(c);
                });
            };
        });
    });
});

router.get('/profile', (req, res) => {
    res.send(req.user._id)
    // User.findOne({ _id: req.user._id }).then(user => {
    //     Review.find({ _id: user.reviews }).then(reviews => {
    //         console.log(reviews);
    //         let copy = reviews.map(review => {
    //             return new Promise((resolve, reject) => {
    //                 let reviewCopy = review.toObject();
    //                 User.findOne({ _id: reviewCopy.author }).then(user => {
    //                     reviewCopy.authorName = user.username;
    //                     reviewCopy.authorPhoto = user.photos;
    //                     resolve(reviewCopy);
    //                 }).catch((err) => {
    //                     console.log(err);
    //                 });
    //             });
    //         });

    //         if (reviews.length === 0) {
    //             res.send('No review on ' + req.params.userID + ' yet');
    //         } else {
    //             Promise.all(copy).then(c => {
    //                 res.send(c);
    //             });
    //         };
    //     });
    // });
});

router.post('/:dogID', (req, res) => {
    let newReview = new Review({
        rating: req.body.rating,
        author: req.user._id,
        text: req.body.text,
        date: new Date(),
    })

    newReview.save().then(() => {
        Dog.findOneAndUpdate({ _id: req.params.dogID }, { $push: { reviews: newReview._id } }, { new: true }).then(dog => {
            User.findOneAndUpdate({ _id: dog.ownerID }, { $push: { reviews: newReview._id } }, { new: true }).catch(e => { console.log(e) });
            Review.find({ _id: dog.reviews }).then(reviews => {
                res.send(reviews);
            })
        });
    });
});

module.exports = router;
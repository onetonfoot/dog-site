const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    userID: String,
    email: String,
    photos: Array,
    description: String,
    rating: Number,
    reviews: Array,
    dogIDs: Array
});

let User = module.exports = mongoose.model('user', userSchema);

module.exports.findOrCreate = function (profile, done) {

    User.findOne({
        userID: profile.id
    }).then((currentUser) => {
        if (currentUser) {
            // already have this user
            console.log('user is: ', currentUser);
            done(null, currentUser);
        } else {
            // if not, create user in our db
            new User({
                userID: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                photos: profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg',
                description: "",
                rating: -1,
                reviews: [],
                dogIDs: []
            }).save().then((newUser) => {
                console.log('created new user: ', newUser);
                done(null, newUser);
            });
        }
    });
}

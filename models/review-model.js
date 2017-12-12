const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: Number,
    author:String,
    text: String,
    date: Date,
});

let Review = module.exports = mongoose.model('review', reviewSchema);

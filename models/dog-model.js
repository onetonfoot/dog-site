const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dogSchema = new Schema({
    name: String,
    breed:String,
    sex: String,
    age: Number,
    size: String,
    description: String,
    reviews: Array,
    rating: Number,
    photos: Array,
    bookings: Array,
    ownerID: String,
});


let Dog = module.exports = mongoose.model('dog', dogSchema);
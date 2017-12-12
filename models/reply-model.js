const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
    reviewID:String,
    author:String,
    text: String,
    date: Date,
})

let Reply = module.exports = mongoose.model('reply', replySchema);

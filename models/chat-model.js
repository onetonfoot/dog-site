const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    senderID:String,
    senderName:String,
    receiverID:String,
    receiverName:String,
    messages: Array,
})

let Chat = module.exports = mongoose.model('chat', chatSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogSchema = new Schema({
    name: String,
    breed:String,
    sex: String,
    age: Number,
    size: String,
    description: String,
    photos: Array,
    ownerID: String,
    ownerName:String,
});

let Dog = module.exports = mongoose.model('dog', dogSchema);

module.exports.create = function(json) {

    new Dog(json)
    .save().then( (newDog) =>{
        console.log('New dog created: ',newDog)
        done(null,newDog)
    })
}

User = require('./user-model')
Dog = require('./dog-model')
var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

names = ['john','bob','kevin'] 

new User({
    userID: '1',
    username: 'John Doe',
    email: 'johndoe@gmail.com' 
}).save()

new Dog(
    { name:'Freddie',
    breed: 'Boxer',
    sex: 'Male',
    size:'Small',
    description: 'Just a lovely dog',
    reviews: [],
    rating:4,
    bookings: [],
    ownerID:'1' })

// console.log("First")
imgs =  []

for( let i = 1; i < 5;i++){

    let s = base64_encode(`../public/img/dog-${i}.jpg`)
    imgs.push(s)

}

// s = base64_encode('../public/img/dog-1.jpg')
console.log(imgs)

// console.log("Second")
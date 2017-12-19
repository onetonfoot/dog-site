const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const Dog = require('../models/dog-model');
const User = require('../models/user-model');
const path = require('path');
const fileUpload = require('express-fileupload');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(fileUpload());
router.use(urlencodedParser);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'form.html'))
})

// Get the view of all dogs for 
router.get('/view/:segment', (req, res) => {
    Dog.find({}, {__v: 0}).limit(9).skip(req.params.segment*9).then(dogs => {
        res.json(dogs);
    });
});

router.get('/view', (req, res) => {
    Dog.find({}, {__v: 0}).then(dogs => {
        res.json(dogs);
    });
});


// Get my dogs only
router.get('/mydogs', (req, res) => {
    Dog.find({ownerID: req.session.passport.user}).then(dogs => {
        res.json(dogs);
    })
})

router.get('/reg',(req,res)=>{

    res.render('form')
})

// Post a dog registration
router.post('/registration' , function(req, res) {

    //Create new dog
    let newDog = new Dog({
        name: req.body.dog_name,
        breed: req.body.dog_breed,
        sex: req.body.dog_sex,
        age: req.body.dog_age,
        size: req.body.dog_size,
        description: req.body.dog_des,
        photos: req.files.dog_photos.slice(0,5).map(photo => photo.data.toString('base64')),
        ownerID: req.session.passport.user
    })

    newDog.save()

    //Update users dog list
    Dog.find( {ownerID:req.user._id}).then( (dogs) =>{
        console.log('ok')
        let ids = dogs.map( x => x.id)
        User.update(
            {_id:req.user._id},
            {dogIDs:ids}
        )
    })
    


    res.send(newDog)
});

// Delete a dog registration
router.delete('/registration', (req, res) => {
    Dog.findOneAndRemove({_id: req.body.dog_id})
        .then(()=>{
            res.send('Removed')
        })
})

// Update a dog registration information
router.put('/registration', (req, res) => {
    Dog.findOneAndUpdate(
        {_id: req.body.dog_ID},
        {
            name: req.body.dog_name,
            breed: req.body.dog_breed,
            sex: req.body.dog_sex,
            age: req.body.dog_age,
            size: req.body.dog_size,
            description: req.body.dog_des
            //photos: req.files.dog_photos.slice(0,5).map(photo => photo.data.toString('base64')),
        }, 
        {new: true}
    ).then(dog => {
        res.send(dog);
    })
})

// Get dog information
router.get('/:dogID',(req,res)=>{
    Dog.findOne({_id: req.params.dogID}).then( (dog)=>{
        res.json(dog)
    })
})

module.exports = router;
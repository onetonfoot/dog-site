const router = require('express').Router();
const bodyParser = require('body-parser');
const Dog = require('../models/dog-model');
const path = require('path');
const fileUpload = require('express-fileupload');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(fileUpload());

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'form.html'))
})

// Get the view of all dogs for 
router.get('/view/:segment', (req, res) => {
    Dog.find({}, {__v: 0}).limit(9).skip(req.params.segment*9).then(dogs => {
        res.json(dogs);
    });
});

// Get my dogs only
router.get('/mydog', (req, res) => {
    Dog.find({ownerID: req.session.passport.user}).then(dogs => {
        res.json(dogs);
    })
})

// Post a dog registration
router.post('/registration', (req, res) => {
    console.log(req.body)
    console.log(req.files)
    Dog.create({
        name: req.body.name,
        breed: req.body.breed,
        sex: req.body.sex,
        age: req.body.age,
        size: req.body.size,
        description: req.body.description,
        photos: req.body.photos,
        ownerID: req.body.ownerID // For postman testing only, for real case use the code below
        //ownerID: req.session.passport.user
    });
    res.send('New dog registered');
});

// Delete a dog registration
router.delete('/registration/:dogID', (req, res) => {
    Dog.remove({_id: req.params.dogID})
        .then(()=>{
            res.send('Registration deleted')
        })
})

// Update a dog registration information
router.put('/registration/:dogID', (req, res) => {
    Dog.update(
        {_id: req.params.dogID},
        {
            name: req.body.name,
            breed: req.body.breed,
            sex: req.body.sex,
            age: req.body.age,
            size: req.body.size,
            description: req.body.description,
            photos: req.body.photos
        }
    ).then(() => {
        res.send('Dog information updated')
    })
})

module.exports = router;
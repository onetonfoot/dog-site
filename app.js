const express = require('express');
const exphbs = require('express-handlebars')
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const indexRoutes = require('./routes/index-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const session = require('express-session');
const keys = require('./config/keys');

const app = express();

// set view engine
app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

//set public dir
app.use(express.static('public'))

//Set up session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/',indexRoutes);

app.listen(8080, () => {
    console.log('app now listening for requests on port 8080');
});

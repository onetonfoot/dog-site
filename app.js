const express = require('express');
const exphbs = require('express-handlebars')
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const session = require('express-session');
const keys = require('./config/keys');
const flash = require('connect-flash');
const app = express();
const http = require('http').Server(app); 
const io = require('socket.io')(http); 
require('./chat/socket')(io) 

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

// Connect Flash
app.use(flash());



// set up routes
const authRoutes = require('./routes/auth-routes');
const indexRoutes = require('./routes/index-routes');
const dogRoutes = require('./routes/dog-routes');
const chatRoutes = require('./routes/chat-routes');
const userRoutes = require('./routes/user-routes');

app.use('/auth', authRoutes);
app.use('/',indexRoutes);
app.use('/dog', dogRoutes);
app.use('/chat', chatRoutes);
app.use('/user', userRoutes);

http.listen(8080, () => {
    console.log('app now listening for requests on port 8080');
});

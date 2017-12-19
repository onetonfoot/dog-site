const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

//Google
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect',
        scope: 'user:email',

    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOrCreate(profile,done)
    })
);

//Facebook
passport.use(
    new FacebookStrategy({
        // options for google strategy
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOrCreate(profile,done)
    })
);

//Twitter
passport.use(
    new TwitterStrategy({
        // options for google strategy
        consumerKey: keys.twitter.consumerKey,
        consumerSecret: keys.twitter.consumerSecret,
        callbackURL: '/auth/twitter/redirect',
        includeEmail: true
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOrCreate(profile,done)
    })
);

//Github
passport.use(
    new GitHubStrategy({
        // options for google strategy
        clientID: keys.github.clientID,
        clientSecret: keys.github.clientSecret,
        callbackURL: '/auth/github/redirect',
        passReqToCallback: true, // req object on auth is passed as first arg
        scope: [ 'user:email' ], // fetches non-public emails as well

    }, (req, accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOrCreate(profile,done)
    })
);
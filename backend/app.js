const express = require('express');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const expressSession = require('express-session');
const path = require('path');
const dotenv = require('dotenv')

dotenv.config();

const app = express();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/google'
}, (accessToken, refreshToken, profile, callback) => {
    callback(null, profile);
}));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/facebook',
    profileFields: ['emails', 'displayName', 'name', 'picture']
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));

passport.serializeUser((user, callback) => {
    callback(null, user);
});

passport.deserializeUser((user, callback) => {
    callback(null, user);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'frontend'));

app.use('/public', express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/?user=' + encodeURIComponent(JSON.stringify(req.user)));
});

app.get('/facebook', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/?user=' + encodeURIComponent(JSON.stringify(req.user)));
});

app.get('/', (req, res) => {
    // Envie o arquivo index.html da pasta frontend
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html'));
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

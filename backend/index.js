index.js

import express from 'express';
import passport, { Passport } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import expressSession from 'express-session';
import { profile } from 'console';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

passport.use(new GoogleStrategy ({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/google'
}, (accessToken, refreshToken, profile, callback)=> {
    callback(null, profile);
}))

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/facebook',
    profileFields: ['emails', 'displayName', 'name', 'picture']
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));

passport.serializeUser((user, callback)=>{
    callback(null, user);
})

passport.deserializeUser((user, callback)=>{
    callback(null, user)
})

app.use(express.static('public'));

app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/login/google', passport.authenticate('google', {scope:['profile email']}));
app.get('/login/facebook', passport.authenticate('facebook', {scope:['email']}));

app.get('/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/?user=' + encodeURIComponent(JSON.stringify(req.user)));
});

app.get('/facebook', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/?user=' + encodeURIComponent(JSON.stringify(req.user)));
});


app.get('/', (req, res)=>{
    res.send(req.user? req.user: 'Not logged in, login with Google or Facebook?');
})

app.listen(3000, ()=> {
    console.log('server started on 3000')
})

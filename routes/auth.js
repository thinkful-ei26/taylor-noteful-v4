'use strict';
const express = require('express');
const passport = require('passport');
// const localStrategy = require('../passport/local'); 
const options = {session: false, failWithError: true};
// passport.use(localStrategy);
const router = express.Router();
const localAuth = passport.authenticate('local', options);

router.post('/login', localAuth, function (req, res) {
    console.log(`${req.user.username} successfully logged in.`);
    return res.json({
        message: 'You Shall Pass!!!', 
        username: req.user.username
    });
});

module.exports = router;
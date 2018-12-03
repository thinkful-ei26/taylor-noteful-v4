const express = require('express');

const User = require('../models/user');

const router = express.Router();


router.post('/', (req,res,next) => {
    let { username, password, fullname = '' } = req.body; 

    fullname = fullname.trim(); 
    if(!username){
        const err = new Error('Missing `username` in request body'); 
        err.status = 404; 
        return next(err);
    }
    if(!password){
        const err = new Error('Missing `password` in request body'); 
        err.status = 404; 
        return next(err);
    }
    return User.hashPassword(password)
    .then(digest => {
    const newUser = {
      username,
      password: digest,
      fullname
    };
    return User.create(newUser);
    })
    .then(result => {
        return res.status(201).location(`/api/users/${result.id}`).json(result);
    })
  .catch(err => {
    if (err.code === 11000) {
      err = new Error('The username already exists');
      err.status = 400;
    }
    next(err);
  });
});
module.exports = router;

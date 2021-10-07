const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

const Admin = require('../models/Admin');

const authenticationMiddleware = require('../middleware/autentic')

router.post('/login/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
  }));

router.post('/cadastrar',authenticationMiddleware,async (req,res) =>{
    const password = await bcrypt.hash(req.body.password, 10);

    const adm = new Admin({
        username: req.body.username,
        password: password,
      });
    
      adm
        .save()
        .then(adm => {
          res.json(adm);
        })
        .catch(error => {
          res.status(500).json(error);
        });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
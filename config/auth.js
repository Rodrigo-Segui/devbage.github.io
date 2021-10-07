var passport = require('passport');
var Strategy = require('passport-local');
var crypto = require('crypto');

const Admin = require('../models/Admin');

module.exports = function() {

passport.use(new Strategy(function(username, password, cb) {
    Admin.findOne({ username: username }, function(err, row) {
      if (err) { return cb(err); }
      if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
      
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        
        var user = {
          id: row.id.toString(),
          username: row.username,
          displayName: row.name
        };
        return cb(null, user);
      });
    });
  }));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

}
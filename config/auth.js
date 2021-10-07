const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Admin = require('../models/Admin');

passport.use(new localStrategy({ usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {

        const user = await Admin.findOne({ username: username })
        if (!user) {
            return done(null, false, { message: 'Essa conta não existe.' });
        }
        bcrypt.compare(password, user.password, (error, batem) => {
            if (batem){
                return done(null, user);
            }
            else
                return done(null, false, { message: 'Senha incorreta' });
        });
    })
);

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user._id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
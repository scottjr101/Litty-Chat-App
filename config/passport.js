var LocalStrategy = require('passport-local').Strategy;

// Load User model
var User = require('../models/users');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    function(email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
  // passport.use(new LocalStrategy
  // ({ usernameField: 'email' }, (email, password, done) => {
  //   // Match user
  //   User.findOne({
  //     email: email
  //   }).then(user => {
  //     if (!user) {
  //       return done(null, false, { message: 'That email is not registered' });
  //     }

  //     // Match password
  //     (password == user.password), (err, isMatch) => {
  //       if (err) throw err;
  //       if (isMatch) {
  //         return done(null, user);
  //       } else {
  //         return done(null, false, { message: 'Password incorrect' });
  //       }
  //     });
  //   });
  // })
   

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
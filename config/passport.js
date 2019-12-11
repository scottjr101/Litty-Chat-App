var LocalStrategy = require("passport-local").Strategy;
var db = require("../models/index");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
      db.User.findOne({ where: { email: email }}).then(function (user) {
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.findById(id, function(err, user) {
      done(err, user);
    });
  });

};

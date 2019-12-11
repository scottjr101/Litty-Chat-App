

module.exports = function(passport, user) {

  var User = user;
  var LocalStrategy = require("passport-local").Strategy;

  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, function (email, password, done) {
      User.findOne({ where: { email: email }}).then(function (user) {
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }
        // if (!user.validPassword(password)) {
        //   return done(null, false, { message: "Incorrect password." });
        // }
        return done(null, user);
      })
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findAll({ where: { id: id }}, function(err, user) {
      done(err, user);
    });
  });

};

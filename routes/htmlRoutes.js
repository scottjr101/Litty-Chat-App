var db = require("../models/index");
var passport = require('passport');

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Litty.findAll({}).then(function(dbLittys) {
      res.render("index", {
        msg: "Welcome!",
        litty: dbLittys
      });
    });
  });
  // Login Page
  app.get("/users/login", function (req, res) {
    res.render("login")
  });
  // Register Page
  app.get("/users/register", function (req, res) {
    res.render("register")
  });
  // Register Handle
  app.post("/users/register", function (req, res) {
    var { name, email, password, password2 } = req.body;
    
    // Check passwords match
    if(password !== password2) {
      res.render("register", {msg:"** Passwords do not match **"});
    }
    
     else {
      // Validation Passed
      db.Users.findOne({ where: { email: email }})
        .then(function(user) {
          if(user) {
           //User Exists
           res.render("register",
           {msg:"** Email already registered **"});

          } else {
            var newUser = new db.Users({
              name,
              email,
              password
            });
            
            newUser.save()
              .then(function(user) {
                res.render('register', { msg: "You have been registered and can now log in. Lit fam." });
              })
              .catch(function(err) {
                console.log(err);
              });

            console.log("New user was created", + newUser.name)
            // res.send("hello");
          }
        });
    }

  });

  // Login Handle
  // app.post("/users/login", function(req, res, next) {
  //   passport.authenticate('local', function(err, user, info) {
  //     if (err) { return next(err); }
  //     if (!user) { return res.redirect("/users/login"); }
  //     else { return res.redirect('/users/' + newUser.email); }
  //   })(req, res, next);
  // });
  app.post('/users/login', function(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login'
    })(req, res, next);
  });

  // Load Litty page and pass in an Litty by id
  app.get("/litty/:id", function(req, res) {
    Litty.findOne({ where: { id: req.params.id } }).then(function(dbLitty) {
      res.render("Litty", {
        litty: dbLitty
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

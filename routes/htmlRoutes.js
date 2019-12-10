var db = require("../models/index");

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
    var errors = [];

    // Check reqired fields
    if(!name || !email || !password || !password2) {
      // errors.push({ msg:"please fill in all fields" });
    }

    // Check passwords match
    if(password !== password2) {
      // errors.push({ msg:"Passwords do not match" })
    }
    
    if(errors.length > 0) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      // Validation Passed
      User.findOne({ email: email })
        .then(user => {
          if(user) {
           //User Exists
          //  errors.push({ msg: "Email already registered" })
          window.alert("Email already registered");
           res.render("register", {
            errors,
            name,
            email,
            password,
            password2
          });
          } else {
            var newUser = new User({
              name,
              email,
              password
            });

            console.log(newUser)
            res.send("hello");
          }
        });
    }

  });
  // Load Litty page and pass in an Litty by id
  app.get("/litty/:id", function(req, res) {
    db.Litty.findOne({ where: { id: req.params.id } }).then(function(dbLitty) {
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

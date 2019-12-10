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
          //  errors.push({ msg: "Email already registered" })
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
                res.redirect("/users/login");
              })
              .catch(function(err) {
                console.log(err);
              });

            console.log(newUser)
            // res.send("hello");
          }
        });
    }

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

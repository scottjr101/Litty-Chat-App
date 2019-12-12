var db = require("../models/index");

module.exports = function(app) {
  // Get all examples
  app.get("/api/Littys", function(req, res) {
    db.Litty.findAll({}).then(function(dbLittys) {
      res.json(dbLittys);
    });
  });

  // Create a new Litty
  app.post("/api/littys", function(req, res) {
    db.Litty.create(req.body).then(function(dbLitty) {
      res.json(dbLitty);
    });
  });

  // Delete an Litty by id
  app.delete("/api/Littys/:id", function(req, res) {
    db.Litty.destroy({ where: { id: req.params.id } }).then(function(dbLitty) {
      res.json(dbLitty);
    });
  });
};
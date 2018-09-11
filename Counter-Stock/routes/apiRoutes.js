var db = require("../models");


module.exports = function (app) {
  // Get all examples
  app.get("/api/characters", function (req, res) {
    db.Character.findAll({}).then(function (dbCharacters) {
      res.json(dbCharacters);
    });
  });

  app.get("/api/characters/:id", function (req, res) {
    db.Character.findOne({ where: { id: req.params.id } }).then(function (dbCharacters) {
      res.json(dbCharacters);
    });
  });

  // Create a new example
  app.post("/api/characters", function (req, res) {
    db.Character.create(req.body).then(function (dbCharacters) {
      console.log(dbCharacters);
      res.json(dbCharacters);
    });
  });

  // Delete an example by id
  app.delete("/api/characters/:id", function (req, res) {
    db.Character.destroy({ where: { id: req.params.id } }).then(function (dbCharacters) {
      res.json(dbCharacters);
    });
  });
};

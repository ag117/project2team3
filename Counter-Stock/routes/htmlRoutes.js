var db = require("../models");

module.exports = function (app) {


  // Load index page
  app.get("/", function (req, res) {
    db.Character.findAll({}).then(function (dbCharacter) {
      res.render("landing", {
        msg: "Welcome!",
        username: dbCharacter.username,
        stockChoice: dbCharacter.stockChoice,
        stockPrice: dbCharacter.stockPrice
        // examples: dbExamples
      });
    });
  });

  // Load index page
  app.get("/index", function (req, res) {
    db.Character.findAll({}).then(function (dbCharacter) {
      res.render("index", {
        msg: "Welcome!",
        username: dbCharacter.username,
        stockChoice: dbCharacter.stockChoice
        // examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/characters/:id", function (req, res) {
    db.Character.findOne({ where: { id: req.params.id } }).then(function (dbCharacter) {
      res.render("characters", {
        username: dbCharacter.username,
        stockChoice: dbCharacter.stockChoice
      });
    });
  });

  app.get("/characters", function (req, res) {
    db.Character.findAll({}).then(function (dbCharacter) {
      res.render("characters", {
        username: dbCharacter.username
      });
    });
  });

  app.get("/fight", function (req, res) {
    db.Character.findAll({}).then(function (dbCharacter) {
      res.render("fight", {
        username: dbCharacter.username,
        stockChoice: dbCharacter.stockChoice,
        stockPrice: dbCharacter.stockPrice
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

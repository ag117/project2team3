// var db = require("../models");

// module.exports = function (app) {
//   // Load index page
//   app.get("/", function (req, res) {
//     db.ticker.findAll({}).then(function (dbticker) {
//       res.render("index", {
//         msg: "Welcome!",
//         username: dbticker.username,
//         stockChoice: dbticker.stockChoice
//       });
//     });
//   });

//   // Load example page and pass in an example by id
//   app.get("/ticker/:id", function (req, res) {
//     db.ticker.findOne({ where: { id: req.params.id } }).then(function (dbticker) {
//       res.render("tickers", {
//         username: dbticker.username,
//         stockChoice: dbticker.stockChoice
//       });
//     });
//   });

//   app.get("/ticker", function (req, res) {
//     db.ticker.findAll({}).then(function (dbticker) {
//       res.render("tickers", {
//         username: dbticker.username
//       });
//     });
//   });


//   // Render 404 page for any unmatched routes
//   app.get("*", function (req, res) {
//     res.render("404");
//   });
// };
var db = require("../models");

module.exports = function(app) {
  app.get("/flavors", function(req, res) {

    db.Distillery.findAll({}).then(function(res) {
      // results are available to us inside the .then
      res.json(res);
      console.log(res);
    });

  //   db.Alcohol.findAll({
  //       where: {
  //           flavor: req.body.flavor
  //       },
  //     include: [db.Distillery]
  //   }).then(function(dbAlcohol) {
  //     res.json(dbAlcohol);
  //   });
  // });

  // app.post("/flavors/:id", function(req, res) {
  //   db.Alcohol.create(req.body).then(function(dbAlcohol) {
  //     res.json(dbAlcohol);
  //   });
  });

  // app.get("/type", function(req, res) {

  //   db.Alcohol.findAll({
  //       where: {
  //         alcoholType: req.body.type
  //       },
  //     include: [db.Distillery]
  //   }).then(function(dbAlcohol) {
  //     res.json(dbAlcohol);
  //   });
  // });

  // app.post("/type", function(req, res) {
  //   db.Alcohol.create(req.body).then(function(dbAlcohol) {
  //     res.json(dbAlcohol);
  //   });
  // });

  // app.get("/locations", function(req, res) {

  //   db.Distillery.findAll({
  //       where: {
  //           city: req.body.city
  //       },
  //     include: [db.Alcohol]
  //   }).then(function(dbDistillery) {
  //     res.json(dbDistillery);
  //   });
  // });

  // app.post("/locations", function(req, res) {
  //   db.Distillery.create(req.body).then(function(dbDistillery) {
  //     res.json(dbDistillery);
  //   });
  // });

  app.get("/api/alcohol/ratings/:AlcoholId", function(req, res) {
    db.UserRating.findOne({
      where: {
        AlcoholId: req.params.AlcoholId
      }, include: [db.Alcohol]
    }).then(function(alcohol) {
      res.json(alcohol);
    })
  });
};
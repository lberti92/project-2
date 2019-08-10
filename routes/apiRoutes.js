var db = require("../models");

module.exports = function(app) {
  app.get("/flavor/:flavor", function(req, res) {
   db.Alcohol.findAll({
        where: {
            flavor: req.params.flavor
        },
      include: [db.Distillery]
    }).then(function(dbAlcohol) {
      res.render("flavor", {flavor: req.params.flavor, results:dbAlcohol});
      // res.json(dbAlcohol);
    });
  });

  app.get("/types/:type", function(req, res) {
    console.log("type route hit");
    console.log(req.params);
    db.Alcohol.findAll({
        where: {
          alcoholType: req.params.type
        },
      include: [db.Distillery]
    }).then(function(dbAlcohol) {
      res.render("type", {alcoholType: req.params.type, results:dbAlcohol});
      // res.json(dbAlcohol);
    });

  });

  app.get("/api/location/:location", function(req, res) {
    db.Distillery.findAll({
        where: {
            city: req.params.location
        },
      include: [db.Alcohol]
    }).then(function(dbDistillery) {
      console.log("we found distillery", dbDistillery);
      // res.render("location", {city: req.params.location, results:dbDistillery});
      res.json(dbDistillery);
      console.log(dbDistillery);
    });
  });

  app.get("/api/distillery/:distId", function(req, res) {
    db.Alcohol.findAll({
      where: {
        DistilleryId: req.params.distId
      }
    }).then(function(alcohols) {
      res.json(alcohols)
    })
  })

  app.get("/api/alcohol/ratings/:AlcoholId", function(req, res) {
    db.UserRating.findOne({
      where: {
        AlcoholId: req.params.AlcoholId
      }, include: [db.Alcohol]
    }).then(function(alcohol) {
      res.json(alcohol);
    })
  });

  app.get("/api/alcohol/rated/:AlcoholId", function(req, res) {
    db.Alcohol.findOne({
      where:  {
        id: req.params.AlcoholId
      }, include: [db.UserRating]
    }).then(function(alcohol) {
      res.json(alcohol)
    })
  })
};
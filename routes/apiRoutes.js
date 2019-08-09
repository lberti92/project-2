var db = require("../models");

module.exports = function(app) {
  app.get("/api/flavors/:flavor", function(req, res) {
    console.log("flavor route hit");
    console.log(req.params);
   db.Alcohol.findAll({
        where: {
            flavor: req.params.flavor
        },
      include: [db.Distillery]
    }).then(function(dbAlcohol) {
      console.log("we found alcohol", dbAlcohol);

      res.render("flavor", {flavor: req.params.flavor, results:dbAlcohol});

      // res.json(dbAlcohol);
    });
  });

  app.get("/api/types/:type", function(req, res) {
    console.log("type route hit");
    console.log(req.params);
    db.Alcohol.findAll({
        where: {
          alcoholType: req.params.type
        },
      include: [db.Distillery]
    }).then(function(dbAlcohol) {
      console.log("we found alcohol");
      res.render("type", {alcoholType: req.params.type, results:dbAlcohol});
      // res.json(dbAlcohol);
    });

  });

  app.get("/api/locations/:location", function(req, res) {
    db.Distillery.findAll({
        where: {
            city: req.params.location
        },
      include: [db.Alcohol]
    }).then(function(dbDistillery) {
      console.log("we found distillery", dbDistillery);
      res.render("???", {city: req.params.location, results:dbDistillery});
      res.json(dbDistillery);
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

  app.post("/api/flavors/:flavor", function(req, res) {
    console.log("flavor route hit");
    console.log(req.params);
   db.Alcohol.findAll({
        where: {
            flavor: req.params.flavor
        },
      include: [db.Distillery]
    }).then(function(dbAlcohol) {
      console.log("we found alcohol", dbAlcohol);
 
      res.json(dbAlcohol);
 
      // res.json(dbAlcohol);
  
    });
  });
};
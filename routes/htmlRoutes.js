// Middleware to ensure that a user is logged-in in order to complete a request
var isAuthenticated = require("../config/isAuthenticated");

var express = require("express");
var router = express.Router();

//create routes and logic
router.get("/", function (req, res){
        res.render("index");
    });
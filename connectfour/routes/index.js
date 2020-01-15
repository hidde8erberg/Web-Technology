var express = require("express");
var router = express.Router();

var stats = require("./../stats");

router.get("/", (req, res) => {
  //res.sendFile("splash.html", {root: "./public"});
  res.render("splash", {
    players: stats.playersOnline,
    ongoing: stats.currentMatches,
    total: stats.totalMatches 
  });
});

router.get("/play", (req, res) => {
  res.render("game");
});

router.get("/home", (req, res) => {
  res.redirect("/");
});

router.get("/newgame", (req, res) => {
  res.render("waiting");
});

module.exports = router;

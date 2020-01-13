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

router.get("/waiting", (req, res) => {
  res.render("waiting");
});

router.get("/home", (req, res) => {
  res.redirect("/");
});

router.get("/newgame", (req, res) => {
  res.render("waiting");
});

router.get("/clicked/:col", (req, res) => {
  // TODO
});

module.exports = router;

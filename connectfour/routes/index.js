var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
  //res.sendFile("splash.html", {root: "./public"});
  res.render("splash");
});

router.get("/play", (req, res) => {
  res.render("game");
});

router.get("/waiting", (req, res) => {
  res.render("waiting")
});

router.get("/home", (req, res) => {
  res.render("splash")
});

router.get("/clicked/:col", (req, res) => {
  // TODO
});

module.exports = router;

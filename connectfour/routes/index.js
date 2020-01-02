var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
  //res.sendFile("splash.html", {root: "./public"});
  res.render("splash");
});

router.get("/new_game", (req, res) => {
  res.sendFile("game.html", {root: "./public"});
});

router.get("/waiting", (req, res) => {
  res.sendFile("waiting.html", {root: "./public"});
});

router.get("/clicked/:col", (req, res) => {

});

module.exports = router;

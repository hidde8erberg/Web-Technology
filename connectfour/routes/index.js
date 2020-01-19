var express = require("express");
var router = express.Router();

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

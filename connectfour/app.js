var express = require("express");
var websocket = require("ws");
var http = require("http");
var path = require('path');
var Game = require("./game.js");

var port = process.argv[2];
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.use(express.static(__dirname + "/public"));
var server = http.createServer(app);


/* ----------------------------------------------- */


// WebSocket interaction
const wss = new websocket.Server({ server });

let waiting = [];
let games = [];

let gameIdCounter = 0;

wss.on("connection", function(ws) {

  ws.on("message", function incoming(msg) {
    console.log(msg);
    if (msg == "waiting") { 
      waiting.push(ws);
      if (waiting.length != 0 && waiting.length % 2 == 0) { newGame(); }
    }
    if (msg == "starting") {  }
  });

});

let newGame = function() {
  // put players in game
  var p1 = waiting.shift();
  var p2 = waiting.shift();
  games.push(new Game(p1, p2, gameIdCounter));
  gameIdCounter++;
  p1.send("start");
  p2.send("start");
  console.log("new game");
}

server.listen(port);
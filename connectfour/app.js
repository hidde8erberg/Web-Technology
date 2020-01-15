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
console.log('server started');
var server = http.createServer(app);

// WebSocket interaction
const wss = new websocket.Server({ server });

let waiting = [];
let games = [];

wss.on("connection", function(ws) {

  console.log("Connected!");

  var uid = Math.random().toString(36).substring(8);
  connections.push(ws);

  ws.on("message", function incoming(message) {
      console.log("[LOG] " + message);
  });

});

server.listen(port);
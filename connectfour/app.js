var express = require("express");
var websocket = require("ws");
var http = require("http");
var path = require('path');

var port = process.argv[2];
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);

// WebSocket interaction
const wss = new websocket.Server({ server });

let connections = [];

wss.on("connection", function(ws) {

  console.log("Connected!");

  connections.push(ws);

  ws.on("message", function incoming(message) {
      console.log("[LOG] " + message);
  });

  console.log(connections);

});

server.listen(port);
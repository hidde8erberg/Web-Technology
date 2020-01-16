var express = require("express");
var websocket = require("ws");
var http = require("http");
var path = require('path');
var Game = require("./game.js");
var User = require("./user.js");

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

var connections = new Map();
var games = new Map();

wss.on("connection", function(ws, req) {
  console.log("Connected!");

  //Get possible cookie parameter from user
  var params = req.url.split('?')[1].split('&')[0].split('=');
  var uid = authUser(params, ws);

  ws.on("message", function incoming(message) {
  });

});

// Perhaps this in another file but wasn't sure how to use the connections Map than.
function authUser(params, ws) {
  let uid = "";
  if(params[0] == "cookie" && connections.has(params[1])) {
    uid = params[1];
  } else {
    uid = Math.random().toString(36).substring(8);
    ws.send( JSON.stringify(['cookie', uid]) );
    connections.set(uid, new User(ws));
  }
  return uid;
}

server.listen(port);
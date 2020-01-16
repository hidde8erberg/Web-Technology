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
var waiting = [];
var games = new Map();

wss.on("connection", function(ws, req) {
  console.log("Connected!");

  //Get possible cookie parameter from user
  var params = req.url.split('?')[1].split('&')[0].split('=');
  var uid = authUser(params, ws);

  if(connections.get(uid).waiting) {
    if(waiting.length > 0) {
      var opp = waiting[0];
      startGame([opp, uid]);

    } else {
      waiting.push(uid);
    }
  } // Optional TODO: Implement redirect to game if user left page

  ws.on("message", function incoming(message) {
    console.log(message, uid);
  });

});

// Perhaps this in another file but wasn't sure how to use the connections Map than.
function authUser(params, ws) {
  let uid = "";
  if(params[0] == "cookie" && connections.has(params[1])) {
    uid = params[1];
  } else {
    uid = Math.random().toString(36).substring(5);
    ws.send( JSON.stringify(['cookie', uid]) );
    connections.set(uid, new User(ws));
  }
  return uid;
}

function startGame(players) {
  let gameid = Math.random().toString(36).substring(7);
  waiting.shift();
  games.set(gameid, new Game(players[0], players[1]));
  for(let i=0;i<2;i++) {
    connections.get(players[i]).waiting = false;
    connections.get(players[i]).gameid = gameid;
    connections.get(players[i]).connection.send(JSON.stringify(['start']));
  }
}

server.listen(port);

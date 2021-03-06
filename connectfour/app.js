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

var connections = new Map();
var waiting = [];
var games = new Map();
var gameCount = 0;

var indexRouter = require('./routes/index');
indexRouter.get("/", (req, res) => {
  res.render("splash", {
    players: connections.size,
    ongoing: games.size,
    total: gameCount
  });
});
app.use('/', indexRouter);

app.use(express.static(__dirname + "/public"));
console.log('server started');
var server = http.createServer(app);

// WebSocket interaction
const wss = new websocket.Server({ server });

wss.on("connection", function(ws, req) {

  //Get possible cookie parameter from user
  var params = req.url.split('?')[1].split('&')[0].split('=');
  var uid = authUser(params, ws);
  var gameid = connections.get(uid).gameid;
  var opp = "";

  if(connections.get(uid).waiting) { // Waiting page
    if(waiting.length > 0 && waiting[0] != uid) {
      opp = waiting[0];
      connections.get(uid).redirected = true;
      connections.get(opp).redirected = true;
      startGame([opp, uid]);

    } else {
      waiting.push(uid);
    }
  } else { // Game page
    connections.get(uid).redirected = false;
    ws.send(JSON.stringify(['turn', connections.get(uid).turn]));
    opp = (uid == games.get(gameid).playerOne ? games.get(gameid).playerTwo : games.get(gameid).playerOne);
  }

  ws.on("message", function incoming(message) {
      var data = JSON.parse(message);
      if(connections.get(uid).turn && data[0] == 'place' && gameid != "none" && games.has(gameid) && data[1] >= 0 && data[1] <= 6) {
        if(games.get(gameid).place(data[1])) { // Place and check for illegal move
          connections.get(opp).connection.send(JSON.stringify(['move', data[1]]));
          if(games.get(gameid).winner != null) {
            connections.get(uid).connection.send(JSON.stringify(['ywin']));
            connections.get(opp).connection.send(JSON.stringify(['ylose']));
            connections.get(uid).turn = false;
          } else {
            connections.get(uid).turn = false;
            connections.get(opp).turn = true;
          }
        }
      }
  });

  ws.on("close", function close() {
    if(!connections.get(uid).redirected) {
      if(connections.has(opp)) {
        connections.get(opp).connection.send(JSON.stringify(['left']));
      }
      if(connections.get(uid).waiting) {
        waiting.shift();
      }
      games.delete(gameid);
      connections.delete(uid);
    }
  });
});

function authUser(params, ws) {
  let uid = "";
  if(params[0] == "cookie" && connections.has(params[1])) {
    uid = params[1];
    connections.get(uid).connection = ws;
  } else {
    uid = Math.random().toString(36).substring(5);
    ws.send( JSON.stringify(['cookie', uid]) );
    connections.set(uid, new User(ws));
  }
  return uid;
}

function startGame(players) {
  let gameid = Math.random().toString(36).substring(7);
  gameCount++;
  waiting.shift();
  games.set(gameid, new Game(players[0], players[1]));
  for(let i=0;i<2;i++) {
    connections.get(players[i]).waiting = false;
    connections.get(players[i]).gameid = gameid;
    connections.get(players[i]).connection.send(JSON.stringify(['start']));
    connections.get(players[i]).turn = (i == 0 ? true : false);
  }
}

server.listen(port);

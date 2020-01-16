var User = function(connection) {
    this.connection = connection;
    this.waiting = true;
    this.turn = false;
    this.gameid = "none";
}

module.exports = User;


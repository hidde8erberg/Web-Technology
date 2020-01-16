var User = function(connection) {
    this.connection = connection;
    this.waiting = true;
    this.gameid = "none";
}

module.exports = User;


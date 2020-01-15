var Game = function(gameID) {
    this.playerOne = null;
    this.playerTwo = null; 
    this.id = gameID;
    this.turn = 1; // player one starts
    this.finished = false;
}

Game.prototype.board = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
];

Game.prototype.place = function(col, player) {

    // check if column is full
    if (Game.prototype.board[col][5] != 0) {
        // TODO: send msg to client
        return;
    }

    for (let i = 0; i < 6; i++) {
        if (Game.prototype.board[col][i] == 0) {
            Game.prototype.board[col][i] = player;
            break;
        }
    }

};

module.exports = Game;
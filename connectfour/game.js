var Game = function(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.turn = playerOne; // player one starts
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

Game.prototype.place = function(col) {

    // check if column is full
    if (Game.prototype.board[col][5] != 0) {
        return false;
    }

    let currentPlayer = (this.turn == this.playerOne ? 1 : 2);
    for (let i = 0; i < 6; i++) {
        if (Game.prototype.board[col][i] == 0) {
            Game.prototype.board[col][i] = currentPlayer;
            this.turn = (currentPlayer == 2 ? this.playerOne : this.playerTwo);
            return true;
            break;
        }
    }
    return false;

};

module.exports = Game;
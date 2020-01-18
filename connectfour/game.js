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

Game.prototype.checkWin = function(col, row, player) {
    var count = 0;
    // Vertical
    for(let i=0;i<6;i++) {
        if(this.board[col][i] == player) {
            count++;
            if(count >= 4) {
                // Win function
                return;
            }
        } else {
            count = 0;
        }
    }
    count = 0;

    // Horizontal
    for(let i=0;i<7;i++) {
        if(this.board[i][row] == player) {
            count++;
            if(count >= 4) {
                // Win function
                return;
            }
        } else {
            count = 0;
        }
    }
    count = 0;


}

module.exports = Game;
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
            this.checkWin(col, i, currentPlayer);
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
                console.log('Vertical win');
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
                console.log('Horizontal win');
                // Win function
                return;
            }
        } else {
            count = 0;
        }
    }
    count = 0;

    // Left-right bottom top diagonal check
    var tempRow = (row >= col ? row-col : 0);
    var tempCol = (row >= col ? 0 : col-row);
    while(tempRow > 5 || tempCol > 6) {
        if(this.board[tempCol][tempRow] == player) {
            count++;
            if(count >= 4) {
                console.log('bottom top diagonal win');
                // Win function
                return;
            }
        } else {
            count = 0;
        }
        tempRow++;
        tempCol++;
    }
    count = 0;

    // Left-right top bottom diagonal check
    // NOT WORKING YET
    var tempRow = (row + col > 6 ? 6 : row + col);
    var tempCol = (row + col > 6 ? col+(6-row) : 0);
    while(tempRow >= 0 && tempCol <= 6) {
        if(this.board[tempCol][tempRow] == player) {
            count++;
            if(count >= 4) {
                console.log('top bottom diagonal win');
                // Win function
                return;
            }
        } else {
            count = 0;
        }
        tempRow--;
        tempCol++;
    }
    count = 0;
    console.log('failure');
}

module.exports = Game;
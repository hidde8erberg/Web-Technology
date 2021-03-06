var Game = function(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.turn = playerOne; // player one starts
    this.finished = false;
    this.winner = null;
    this.board = [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ];
}

Game.prototype.place = function(col) {

    // check if column is full
    if (this.board[col][5] != 0) {
        console.log(this.board);
        return false;
    }

    let currentPlayer = (this.turn == this.playerOne ? 1 : 2);
    for (let i = 0; i < 6; i++) {
        if (this.board[col][i] == 0) {
            this.board[col][i] = currentPlayer;
            this.checkWin(col, i, currentPlayer);
            this.turn = (currentPlayer == 2 ? this.playerOne : this.playerTwo);
            return true;
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
                this.winner = this.turn;
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
                this.winner = this.turn;
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
    while(tempRow <= 5 && tempCol <= 6) {
        if(this.board[tempCol][tempRow] == player) {
            count++;
            if(count >= 4) {
                console.log('bottom top diagonal win');
                this.winner = this.turn;
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
    tempRow = (row + col > 5 ? 5 : row + col);
    tempCol = (row + col > 5 ? col-(6-row-1) : 0);
    while(tempRow >= 0 && tempCol <= 6) {
        if(this.board[tempCol][tempRow] == player) {
            count++;
            if(count >= 4) {
                console.log('top bottom diagonal win');
                this.winner = this.turn;
                return;
            }
        } else {
            count = 0;
        }
        tempRow--;
        tempCol++;
    }
}

module.exports = Game;
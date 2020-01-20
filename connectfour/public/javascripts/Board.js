function Board() {
    this.turn = false;
    var that = this;
    this.board = [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ]

    this.place = function(col, player) {
        if (this.checkcol(col) || (!this.turn && player == 1) ) {
            return;
        }

        for (let i = 0; i < 6; i++) {
            if (this.board[col][i] == 0) {
                this.board[col][i] = player;
                var square = document.getElementById("c"+col).children[5-i].children[0];
                if (player == 1) {
                    ws.send(JSON.stringify(['place', col]) );
                    document.getElementById("you").innerHTML = "OPPONENT'S TURN";
                    square.style.backgroundColor = "yellow";
                    this.turn = false;
                } else {
                    square.style.backgroundColor = "red";
                    this.turn = true;
                }

                break;
            }
        }
    }

    for (let i = 0; i < 7; i++) {
        document.getElementById("c" + i).onclick = function() {
            that.place(i, 1);
        };
    } 

    this.checkcol = function(col) {
        if (this.board[col][5] != 0) {
            return true;
        } else {
            return false;
        }
    };

    this.startTurn = function() { // TODO: Graphical notice of turns
        if(this.turn) {
            console.log("It's your turn");
        } else {
            console.log("It's not your turn");
        }
    }

}

let b = new Board();
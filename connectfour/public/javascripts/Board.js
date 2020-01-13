function Board() {
    this.empty = 0; // 0 will indicate that the space is not occupied
    this.player1 = 1;
    this.player2 = 2;

    this.board = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ]

    this.place = function(col, player) {
        if (!this.checkcol) {
            return;
        }

        for (let i = 0; i < 6; i++) {
            if (this.board[col][i] == this.empty) {
                this.board[col][i+1] = player;
            }
        }
    };

    this.checkcol = function(col) {
        if (this.board[col][5] != this.empty) {
            return true;
        } else {
            return false;
        }
    };

    document.getElementById("c1").onclick = function() {
        console.log("clicked 1");
    };
    document.getElementById("c2").onclick = function() {
        console.log("clicked 2");
    };
    document.getElementById("c3").onclick = function() {
        console.log("clicked 3");
    };
    document.getElementById("c4").onclick = function() {
        console.log("clicked 4");
    };
    document.getElementById("c5").onclick = function() {
        console.log("clicked 5");
    };
    document.getElementById("c6").onclick = function() {
        console.log("clicked 6");
    };
    document.getElementById("c7").onclick = function() {
        console.log("clicked 7");
    };
}

let b1 = new Board();

function Board() {

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
        if (this.checkcol(col)) {
            return;
        }

        for (let i = 0; i < 6; i++) {
            if (this.board[col][i] == 0) {
                this.board[col][i] = player;

                var square = document.getElementById("c"+col).children[5-i].children[0];
                square.style.backgroundColor = "yellow";

                break;
            }
        }
    }

    for (let i = 0; i < 7; i++) {
        document.getElementById("c" + i).onclick = function() {
            ws.send("place " + i);
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

    var that = this;

}

let b = new Board();
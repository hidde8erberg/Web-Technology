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
                console.log(1);
                
                break;
            }
        }

    };

    this.checkcol = function(col) {
        if (this.board[col][5] != 0) {
            return true;
        } else {
            return false;
        }
    };

    var that = this;

    for (let i = 0; i < 7; i++) {
        document.getElementById("c"+i).onclick = function() {
            that.place(i, 1);
        };
    }

}

let b = new Board();

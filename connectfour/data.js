module.exports = function() {
    this.User = function() {
        this.waiting = true;
    }
    this.Game = function(user1, user2) {
        this.turn = "";
        this.lastPlayed = "Time";
        this.user1 = user1;
        this.user2 = user2;

        this.board == [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ];
    }
}
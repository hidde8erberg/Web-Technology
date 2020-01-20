var ws = new WebSocket("ws://localhost:3000/?cookie=" + getCookie("uid-cnnctfr"));

ws.onopen = function() {
}

ws.onmessage = function(message) {
    let data = JSON.parse(message.data);
    let type = data[0], value = data[1];

    if(type == 'cookie') {
        setCookie("uid-cnnctfr", value, 1);
    } else if(type == 'start') {
        window.location.href = 'play';
    } else if(type == 'turn') {
        (value ? b.turn = true : "");
        document.getElementById("you").innerHTML = (value ? "YOUR TURN" : "OPPONENT'S TURN");
        b.startTurn();
    } else if(type == 'move') {
        b.place(data[1], 2);
    } else if(type == 'left') {
        //document.body.innerHTML = "<h1>Your opponent left the game</h1>" + document.body.innerHTML;
        alert("Your opponent left the game");
    } else if(type == 'ywin') {
        document.getElementById("you").innerHTML = "YOU WON!";
        //document.body.innerHTML = "<h1>YOU WON THE GAME</h1>" + document.body.innerHTML;
        b.turn = false;
    } else if(type == 'ylose') {
        document.getElementById("you").innerHTML = "YOU LOST!";
        //document.body.innerHTML = "<h1>You lost the game..</h1>" + document.body.innerHTML;
        b.turn = false;
    }

}
var ws = new WebSocket("ws://"+window.location.host +"/?cookie=" + getCookie("uid-cnnctfr"));

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
        document.getElementById("you").innerHTML = (b.turn ? "YOUR TURN" : "OPPONENT'S TURN");
        b.startTurn();
    } else if(type == 'move') {
        b.place(data[1], 2);
        document.getElementById("you").innerHTML = "YOUR TURN";
    } else if(type == 'left') {
        alert("Your opponent left the game");
    } else if(type == 'ywin') {
        document.getElementById("you").innerHTML = "YOU WON!";
        b.turn = false;
    } else if(type == 'ylose') {
        document.getElementById("you").innerHTML = "YOU LOST!";
        b.turn = false;
    }

}
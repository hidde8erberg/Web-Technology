var ws = new WebSocket("ws://localhost:3000");

ws.onmessage = function(msg) {
    console.log(msg.data);
}

ws.onopen = function() {
    ws.send("waiting");
}
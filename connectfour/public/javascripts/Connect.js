var ws = new WebSocket("ws://localhost:3000");

ws.onmessage = function(msg) {
    console.log(msg.data);
    if (msg.data == "start") {
        window.location.href = "/play";
    }
}

ws.onopen = function() {
    ws.send("waiting");
}
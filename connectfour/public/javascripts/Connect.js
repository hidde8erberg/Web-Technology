var ws = new WebSocket("ws://localhost:3000");

ws.onopen = function() {
    ws.send('something');
}
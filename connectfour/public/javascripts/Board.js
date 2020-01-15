var ws = new WebSocket("ws://localhost:3000");

for (let i = 0; i < 7; i++) {
    document.getElementById("c" + i).onclick = function() {
        ws.send("place " + i);
        console.log(i)
    };
}

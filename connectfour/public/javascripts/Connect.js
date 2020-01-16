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
    }

}
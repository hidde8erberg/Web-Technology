// source: https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript

minutesLabel = document.getElementById("minutes");
secondsLabel = document.getElementById("seconds");

seconds = 0;

setInterval(setTime, 1000)

function setTime() {
    ++seconds;
    secondsLabel.innerHTML = pad(seconds % 60);
    minutesLabel.innerHTML = pad(parseInt(seconds / 60));
}

pad = function(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
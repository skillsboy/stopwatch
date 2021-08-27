let stopwatch = document.getElementById("stopwatch");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let isActive = false;
let interval;
let timestampDiff;

startBtn.addEventListener("mousedown", start);
resetBtn.addEventListener("mousedown", reset);

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", function () {
    this.addEventListener("keydown", keydownHandler);
});

function keydownHandler(e) {
    document.removeEventListener("keydown", keydownHandler);

    if (e.keyCode === 32) start();
    if (e.keyCode === 82) reset();
}

function start() {
    if (isActive) {
        stop();
        return;
    }

    isActive = true;

    startBtn.textContent = "STOP";
    startBtn.classList = "stopBtn";

    let startTimestamp = timestampDiff
        ? Math.floor(performance.now()) - timestampDiff
        : Math.floor(performance.now());

    interval = setInterval(function () {
        let curTimestamp = Math.floor(performance.now());
        timestampDiff = curTimestamp - startTimestamp;
        let timestamps = (timestampDiff / 1000).toFixed(3).toString().split(".");
        let totalSeconds = timestamps[0];

        let miliseconds = timestamps[1].substr(0, 2); // remove the 3rd digit
        let seconds = ("00" + (totalSeconds % 60)).substr(-2); // always 2 digits
        let minutes = ("00" + Math.floor(totalSeconds / 60)).substr(-2); // always 2 digits

        stopwatch.textContent = `${minutes}:${seconds}.${miliseconds}`;
    }, 10);
}

function stop() {
    clearInterval(interval);
    isActive = false;
    startBtn.textContent = "START";
    startBtn.classList = "startBtn";
}

function reset() {
    clearInterval(interval);
    isActive = false;
    timestampDiff = undefined;
    stopwatch.textContent = "00:00.00";
    startBtn.textContent = "START";
    startBtn.classList = "startBtn";
}

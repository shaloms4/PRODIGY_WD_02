let timer;
let isRunning = false;
let elapsedTime = 0;
let lapTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(time) {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor(time % 60)).padStart(2, '0');
    const microseconds = String(Math.floor((time % 1) * 100)).padStart(2, '0'); 
    return `${hours}:${minutes}:${seconds}.${microseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!isRunning) {
        timer = setInterval(() => {
            elapsedTime += 0.01; 
            updateDisplay();
        }, 10); 
        isRunning = true;
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapItem = document.createElement('li');
        lapTime = elapsedTime;
        lapItem.textContent = formatTime(lapTime);
        lapsList.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

updateDisplay();

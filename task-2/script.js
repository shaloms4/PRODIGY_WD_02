let timerInterval;
let isRunning = false;
let startTime;
let elapsedTime = 0; 
let lapCount = 1; 

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapList = document.getElementById('lapList');

function updateDisplay() {
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000).toString().padStart(2, '0');
  const milliseconds = Math.floor((elapsedTime % 1000) / 10).toString().padStart(2, '0');

  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
  millisecondsElement.textContent = milliseconds;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    document.getElementById('startButton').disabled = true;
    document.getElementById('pauseButton').disabled = false;
  }
}

function pauseTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
    document.getElementById('startButton').disabled = false;
    document.getElementById('pauseButton').disabled = true;
  }
}

function resetTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  document.getElementById('startButton').disabled = false;
  document.getElementById('pauseButton').disabled = true;
  lapCount = 1;
  lapList.innerHTML = '';
}

function lapTimer() {
  const lapTime = `${lapCount}. ${hoursElement.textContent}:${minutesElement.textContent}:${secondsElement.textContent}.${millisecondsElement.textContent}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
  lapCount++;
}

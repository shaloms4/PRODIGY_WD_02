let timerInterval;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 1;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const lapList = document.getElementById('lapList');

function updateDisplay() {
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000).toString().padStart(2, '0');

  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 1000); // Update display every second
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
  const lapTime = `${hoursElement.textContent}:${minutesElement.textContent}:${secondsElement.textContent}`;
  const lapItem = document.createElement('li');
  lapItem.innerHTML = `<span class="lap-number">${lapCount} -  </span> <span class="lap-time">${lapTime}</span>`;
  lapList.appendChild(lapItem);
  lapCount++;
}

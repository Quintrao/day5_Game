const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
let score = 0;
let time = 0;
let arcadeMode = false;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn") || event.target.parentNode.classList.contains("time-btn")) {
    time = +event.target.getAttribute("data-time") || +event.target.parentNode.getAttribute("data-time");
    screens[1].classList.add("up");
    if (event.target.classList.contains("mode-btn") || event.target.parentNode.classList.contains("mode-btn")) {
        arcadeMode = true;
    }
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
    if (arcadeMode) {
      time++;
      timeEl.style.color = "green";
      setTimeout(() => {
        timeEl.style.color = "white";
      }, 200);
    }
    } else if (arcadeMode) {
        time--
        timeEl.style.color = "red";
        setTimeout(() => {
          timeEl.style.color = "white";
        }, 200);
    }


});

function startGame() {
  setInterval(decreaseTime, 1000);
  timeEl.innerHTML = `00:${time}`;
  createRandomCircle();
}

function decreaseTime() {
  if (time <= 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  console.log(x, y)
  circle.style.width = size + "px";
  circle.style.height = size + "px";
  circle.style.top = x + "px";
  circle.style.left = y + "px";
  circle.style.background = getRandomColor();
  console.log(circle.style.backgroundColor);
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  let color =
    "rgba(" +
    getRandomNumber(0, 255) +
    ", " +
    getRandomNumber(0, 255) +
    ", " +
    getRandomNumber(0, 255) +
    ", 1)";
  return color;
}

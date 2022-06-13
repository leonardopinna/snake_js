"use strict";

let currentHighScore = localStorage.getItem("HighScore");
let currentTopPlayer = localStorage.getItem("Player");
document.getElementById("best-score").innerHTML = `Record: ${currentHighScore} - ${currentTopPlayer}`;

if (localStorage.getItem("HighScore") !== null) {
}

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let height = 500;
let width = 500;
let step = 20;
let score = 0;
let gameOn = true;
let interval;

canvas.height = height;
canvas.width = width;
ctx.fillStyle = "red";
ctx.fillRect(0, 0, width, height);

class Snake {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.body = [{ x: this.x, y: this.y }];
    this.dir = dir;
  }

  move() {
    this.body.pop();

    let newPos = {};

    switch (this.dir) {
      // move right
      case 0:
        this.x += step;

        break;
      // move up
      case 1:
        this.y -= step;

        break;
      // move left
      case 2:
        this.x -= step;

        break;
      // move down
      case 3:
        this.y += step;

        break;
      default:
        null;
    }
    this.checkHitBorder();
    newPos = { x: this.x, y: this.y };
    this.body.unshift(newPos);
  }

  checkHitBorder() {
    if (this.x < 0) {
      this.x = width - step;
    }
    if (this.x >= width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = height - step;
    }
    if (this.y >= height) {
      this.y = 0;
    }
  }

  grow() {
    let newPart = this.body[this.body.length - 1];
    this.body.push(newPart);
  }
}

class Apple {
  constructor() {
    this.x = Math.floor((Math.random() * (width - 20)) / 20) * 20;
    this.y = Math.floor((Math.random() * (height - 20)) / 20) * 20;
  }
}

function gameloop() {
  interval = setInterval(show, 100);
}

function show() {
  update();
  draw();
}

function update() {
  snake.move();

  if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
    eatApple();
  }

  if (
    snake.body.find(
      (element) => element !== snake.body[0] && element.x === snake.body[0].x && element.y === snake.body[0].y
    ) !== undefined
  ) {
    gameOver();
    checkBestScore(score);
  }
}

function draw() {
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "purple";
  ctx.fillRect(apple.x, apple.y, 20, 20);
  ctx.fillStyle = "black";

  for (let i = 0; i < snake.body.length; i++) {
    ctx.fillRect(snake.body[i].x, snake.body[i].y, 20, 20);
  }

  if (!gameOn) {
    ctx.fillStyle = "white";
    ctx.font = "40px OCR A Std, monospace";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", width / 2, height / 2 - 25);
    ctx.font = "30px OCR A Std, monospace";
    ctx.fillText(`Punteggio: ${score}`, width / 2, height / 2 + 25);
  }
}

function newGame() {
  gameOn = true;
  score = 0;
  document.getElementById("score").innerHTML = `Punteggio: ${score}`;
  snake = new Snake(20, 20, 0);
  gameloop();
}

let snake = new Snake();
let apple = new Apple();

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    if (!(snake.dir === 2)) {
      snake.dir = 0;
    }
  }
  if (e.key === "ArrowUp") {
    if (!(snake.dir === 3)) snake.dir = 1;
  }
  if (e.key === "ArrowLeft") {
    if (!(snake.dir === 0)) snake.dir = 2;
  }
  if (e.key === "ArrowDown") {
    if (!(snake.dir === 1)) snake.dir = 3;
  }
});

document.getElementById("start-game-button").addEventListener("click", newGame);

function eatApple() {
  snake.grow();
  apple = new Apple();

  // if the apple spawns on snake body, create new apple until it goes to a valid position.
  while (snake.body.find((element) => element.x === apple.x && element.y === apple.y) !== undefined) {
    apple = new Apple();
  }
  score++;
  document.getElementById("score").innerHTML = `Punteggio: ${score}`;
}

function checkBestScore(score) {
  let currentHighScore = localStorage.getItem("HighScore");

  if (score > currentHighScore) {
    let currentPlayer = prompt("Complimenti, hai ottenuto un nuovo punteggio migliore!\nCome ti chiami?");
    localStorage.setItem("HighScore", score);
    localStorage.setItem("Player", currentPlayer);

    document.getElementById("best-score").innerHTML = `Record: ${score} - ${currentPlayer}`;
  }
}

function gameOver() {
  clearInterval(interval);
  gameOn = false;
}

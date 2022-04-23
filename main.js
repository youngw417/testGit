/*
select following in javascript with querySelector
score, startScreen, gameArea
addEvenlistener onto startScreen with function name start
when it is clicked, console log("clicked");


*/

const score = document.querySelector('.score');
const startScreen = document.querySelector('.start_1');
const gameArea = document.querySelector('.gameArea');
const sound = new Audio('car_crash2.wav');
const sound2 = new Audio('car_passing.wav');

const keys = {
  ArrrowUP: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};
const player = {
  speed: 5,
  score: 0,
};

startScreen.addEventListener('click', start);
document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);

function pressOn(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function pressOff(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function start() {
  startScreen.classList.add('hide');
  gameArea.classList.remove('hide');
  gameArea.innerHTML = '';
  score.classList.remove('hide');
  player.start = true;
  sound.pause();
  sound.currentTime = 0;
  sound2.play();
  player.score = 0;
  for (let x = 0; x < 10; x++) {
    const div = document.createElement('div');
    div.classList.add('line');
    div.y = x * 150;
    div.style.top = x * 150 + 'px';
    gameArea.appendChild(div);
  }
  window.requestAnimationFrame(playGame);
  const car = document.createElement('div');
  car.innerText = 'Car';
  car.setAttribute('class', 'car');
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  for (let x = 0; x < 3; x++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = (x + 1) * 600 * -1;
    enemy.style.top = enemy.y + 'px';
    enemy.style.left = randomNum(250) + 'px';
    enemy.style.backgroundColor = getColorRgb();
    gameArea.appendChild(enemy);
  }
}

function randomNum(num) {
  const randomNum = Math.floor(Math.random() * num);
  return randomNum;
}
function getColorRgb() {
  // rgb(234, 43, 234)
  return `rgb(${randomNum(255)}, ${randomNum(255)}, ${randomNum(255)})`;
}

function playGame() {
  const car = document.querySelector('.car');
  moveLines();
  moveEnemy(car);
  const road = gameArea.getBoundingClientRect();
  console.log('sound', sound2.currentTime);
  if (sound2.currentTime >= 10) {
    sound2.play();
    sound2.currentTime = 0;
  }
  if (player.start) {
    if (keys.ArrowUp && player.y > road.y) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    }
    car.style.left = player.x + 'px';
    car.style.top = player.y + 'px';
    window.requestAnimationFrame(playGame);
    player.score++;
    score.innerHTML = 'Score: ' + player.score;
  }
}

function moveEnemy(myCar) {
  let ele = document.querySelectorAll('.enemy');
  ele.forEach((each) => {
    if (isCollide(myCar, each)) {
      sound2.pause();
      sound2.currentTime = 0;
      sound.play();
      endGame();
      return;
    }
    if (each.y >= 1500) {
      each.y = -600;
      each.style.left = randomNum(250) + 'px';
      each.style.backgroundColor = getColorRgb();
    }
    each.y += player.speed;
    each.style.top = each.y + 'px';
  });
}

function endGame() {
  player.start = false;
  score.innerHTML = 'Game Over<br> Score was ' + player.score;
  startScreen.classList.remove('hide');
}
function isCollide(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  // when we collide we return true
  // but !(we define when two car is not collide)
  const test =
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right;
  return !test;
}
//
//
//

function moveLines() {
  const lines = document.querySelectorAll('.line');
  lines.forEach((item) => {
    if (item.y >= 1500) {
      item.y -= 1500;
    }
    item.y += player.speed;
    item.style.top = item.y + 'px';
  });
}

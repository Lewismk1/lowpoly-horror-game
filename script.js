let data;
let power = 100;
let enemyDistance = 100;

let door = false;
let camera = false;
let light = false;
let gameOver = false;

const screen = document.getElementById("screen");

fetch("gameData.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    startGame();
  });

function startGame() {
  setInterval(loop, 100);
}

function loop() {
  if (gameOver) return;

  power -= data.powerDrain.idle;
  if (door) power -= data.powerDrain.door;
  if (camera) power -= data.powerDrain.camera;
  if (light) power -= data.powerDrain.light;

  enemyDistance -= data.enemy.speed * (1 + Math.random() * data.enemy.aggression);

  updateUI();

  if (enemyDistance <= 0 && !door) jumpscare();
  if (power <= 0) jumpscare();
}

function toggleDoor() {
  door = !door;
  flash(door ? "DOOR CLOSED" : "DOOR OPEN");
}

function toggleCamera() {
  camera = !camera;
  screen.classList.toggle("camera", camera);
  flash(camera ? "CAMERA FEED" : "OFFICE");
}

function toggleLight() {
  light = !light;
  screen.classList.toggle("light-on", light);
}

function updateUI() {
  document.getElementById("power").innerText =
    "Power: " + Math.max(0, power.toFixed(0)) + "%";
}

function flash(text) {
  screen.innerText = text;
  setTimeout(() => {
    screen.innerText = camera ? "CAMERA FEED" : "OFFICE";
  }, 400);
}

function jumpscare() {
  gameOver = true;
  screen.innerText = "YOU WERE TOO LATE";
  document.body.style.background = "darkred";
  setTimeout(() => location.reload(), 3000);
}

let data;
let power = 100;
let enemyDistance = 100;

let door = false;
let camera = false;
let light = false;
let gameOver = false;

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

  if (enemyDistance <= data.enemy.jumpscareDistance && !door) {
    jumpscare();
  }

  if (power <= 0) {
    power = 0;
    jumpscare();
  }
}

function toggleDoor() {
  door = !door;
  flash(door ? "DOOR CLOSED" : "DOOR OPEN");
}

function toggleCamera() {
  camera = !camera;
  flash(camera ? "CAMERA FEED" : "OFFICE");
}

function toggleLight() {
  light = !light;
  flash(light ? "LIGHT ON" : "LIGHT OFF");
}

function updateUI() {
  document.getElementById("power").innerText =
    "Power: " + Math.max(0, power.toFixed(0)) + "%";

  document.getElementById("status").innerText =
    enemyDistance < 40 ? "Status: DANGER" : "Status: Calm";
}

function flash(text) {
  document.getElementById("screen").innerText = text;
  setTimeout(() => {
    document.getElementById("screen").innerText =
      camera ? "CAMERA FEED" : "OFFICE";
  }, 400);
}

function jumpscare() {
  gameOver = true;
  document.body.style.background = "darkred";
  document.getElementById("screen").innerText = "YOU SHOULD NOT HAVE LOOKED";
  setTimeout(() => location.reload(), 3000);
}


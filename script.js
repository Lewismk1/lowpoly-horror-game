let scene, camera, renderer;
let light;
let enemy;
let power = 100;
let cameraMode = false;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.6, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // ROOM
  const roomGeo = new THREE.BoxGeometry(10, 5, 10);
  const roomMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    side: THREE.BackSide
  });
  const room = new THREE.Mesh(roomGeo, roomMat);
  scene.add(room);

  // LIGHT
  light = new THREE.PointLight(0xffffff, 1, 20);
  light.position.set(0, 3, 0);
  scene.add(light);

  // FLOOR
  const floorGeo = new THREE.PlaneGeometry(10, 10);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x080808 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // ENEMY (LOW POLY)
  const enemyGeo = new THREE.BoxGeometry(1, 2, 1);
  const enemyMat = new THREE.MeshStandardMaterial({ color: 0x550000 });
  enemy = new THREE.Mesh(enemyGeo, enemyMat);
  enemy.position.set(0, 1, -4);
  scene.add(enemy);

  window.addEventListener("resize", onResize);
}

function animate() {
  requestAnimationFrame(animate);

  // Enemy slowly approaches
  enemy.position.z += 0.005;

  // Jumpscare trigger
  if (enemy.position.z > 1) {
    document.body.style.background = "darkred";
    alert("YOU WERE CAUGHT");
    location.reload();
  }

  // Power drain
  power -= cameraMode ? 0.05 : 0.01;
  document.getElementById("power").innerText =
    "Power: " + Math.max(0, power.toFixed(0)) + "%";

  renderer.render(scene, camera);
}

function toggleLight() {
  light.visible = !light.visible;
}

function toggleCamera() {
  cameraMode = !cameraMode;
  camera.position.z = cameraMode ? -2 : 5;
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

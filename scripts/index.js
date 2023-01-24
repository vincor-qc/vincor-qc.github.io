const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-3.2, 3.2, 3.4, -2.4, -2, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(1, 4, 2);
scene.add(light);

const geo = new THREE.PlaneGeometry(5, 5, 100, 100);
const material = new THREE.MeshNormalMaterial();
const plane = new THREE.Mesh(geo, material);
plane.rotation.x = -Math.PI / 2;

const cubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// Make a mesh standard material with a pastel bright orange color
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });
const cube = new THREE.Mesh(cubeGeo, cubeMaterial);

cube.position.y = 0.25;
scene.add(cube);

scene.add(plane);
camera.position.set(3, 1, 3);
camera.lookAt(0, 0, 0);

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();
document.addEventListener("mousemove", onDocumentMouseMove, false);
window.addEventListener("resize", onWindowResize, false);
document.addEventListener("mousedown", onMouseDown, false);
document.addEventListener("mouseup", onMouseUp, false);

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let mouseDown = false;

function onMouseDown(event) {
  mouseDown = true;
}

function onMouseUp(event) {
  mouseDown = false;
}

function animate() {
  requestAnimationFrame(animate);

  if (mouseDown) {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects([plane]);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      point.y = 0.25;
      cube.lookAt(point);

      const relative = point.clone().sub(cube.position);
      cube.position.x += relative.x * 0.01;
      cube.position.z += relative.z * 0.01;
      console.log(point);
    } else {
    }
  }

  renderer.render(scene, camera);
}

animate();

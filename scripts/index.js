const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geo = new THREE.PlaneGeometry(2, 2, 1, 1);
const material = new THREE.MeshNormalMaterial();
const plane = new THREE.Mesh(geo, material);

const sphereGeo = new THREE.SphereGeometry(0.1, 32, 32);
const sphereMaterial = new THREE.MeshNormalMaterial();
const sphere = new THREE.Mesh(sphereGeo, sphereMaterial);

sphere.position.z = 0.5;
scene.add(sphere);

scene.add(plane);
camera.position.z = 1;
camera.position.y = -2;
camera.position.x = 1;
camera.rotation.x = Math.PI / 2;
camera.rotation.y = Math.PI / 6;

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();

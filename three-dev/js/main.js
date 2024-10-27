import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let container, camera, scene, renderer, rocket, controls;

init();

function init() {
  // Scene and Camera Setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  // Rocket creation
  createRocket();

  // Camera Position
  camera.position.set(5, 5, 5);

  // Axis Helper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
  camera.lookAt(axesHelper.position);

  // Lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  // Orbit Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.screenSpacePanning = false;
  controls.minDistance = 1;
  controls.maxDistance = 100;
}

function createRocket() {
  const rocketGroup = new THREE.Group(); // Group to hold all rocket parts

  // Rocket Body (Cylinder)
  const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
  const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  rocketGroup.add(body);

  // Rocket Nose (Cone)
  const noseGeometry = new THREE.ConeGeometry(0.2, 0.5, 32);
  const noseMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.y = 1.25;
  rocketGroup.add(nose);

  // Rocket Fins (Cone)
  const finGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.02);
  const finMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });

  const fin1 = new THREE.Mesh(finGeometry, finMaterial);
  fin1.position.set(0.15, -1, 0);
  fin1.rotation.z = Math.PI / 4;
  rocketGroup.add(fin1);

  const fin2 = fin1.clone();
  fin2.position.set(-0.15, -1, 0);
  fin2.rotation.z = -Math.PI / 4;
  rocketGroup.add(fin2);

  const fin3 = fin1.clone();
  fin3.position.set(0, -1, 0.15);
  fin3.rotation.x = Math.PI / 4;
  rocketGroup.add(fin3);

  const fin4 = fin1.clone();
  fin4.position.set(0, -1, -0.15);
  fin4.rotation.x = -Math.PI / 4;
  rocketGroup.add(fin4);

  // Positioning the Rocket
  rocketGroup.position.set(0, 1, 0);
  scene.add(rocketGroup);

  rocket = rocketGroup;
}

function animate() {
  rocket.rotation.y += 0.01;
  rocket.rotation.x += 0.005;

  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", resize, false);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

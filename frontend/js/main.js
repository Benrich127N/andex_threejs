import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer (from original index.html)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-canvas").appendChild(renderer.domElement);
renderer.domElement.style.zIndex = '-1';


// Earth Sphere (from original index.html)
const geometry = new THREE.SphereGeometry(2, 64, 64);
const texture = new THREE.TextureLoader().load("https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg");
const material = new THREE.MeshPhongMaterial({ map: texture });
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth dragging
controls.enableZoom = true; // Allow zoom
controls.enablePan = false;
controls.dampingFactor = 0.05; // Adjust damping for smoother rotation
controls.rotateSpeed = 1.0; // Control rotation speed
controls.zoomSpeed = 1.2; // Control zoom speed
controls.target.set(0, 0, 0); // Focus on Earth's center
controls.minDistance = 2; // Minimum zoom distance
controls.maxDistance = 10; // Maximum zoom distance



// Lights (from original index.html)
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 3, 5).normalize();
scene.add(light);

camera.position.z = 5;

// Animation Loop (from original index.html)
function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.002;
  earth.rotation.x += 0.002; 
  // spin Earth
  controls.update();
  renderer.render(scene, camera);
  
}
animate();




// Resize (from original index.html)

function handleWindowResize () {
  camera.aspect = window.innerWidth /window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize);





// Code from index.js
const w = window.innerWidth;
const h = window.innerHeight;

// const earthGroup = new THREE.Group();
// earthGroup.rotation.z = -23.4 * Math.PI /180; 
// scene.add(earthGroup);



// const loader = new THREE.TextureLoader();
// const geo = new THREE.IcosahedronGeometry(1, 12);
// const mat = new THREE.MeshStandardMaterial({map: loader.load("./textures/00_earthmap1k.jpg")});

// const earthMesh = new THREE.Mesh(geo, mat); 
// earthGroup.add(earthMesh);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);



// THERE ARE THREE THINGS THREE JS NEEDS FOR SCENE 
// 1 RENDERER 
// 2 CAMERA 
// 3 SCENE OBJECT
// Reusable function to create the Three.js scene


import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function createScene(containerId) {
    const container = document.getElementById(containerId);
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Controls for interactivity
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return { scene, camera, renderer, controls };
}

// Reusable function to create a simple 3D cake
function createCake() {
    const cakeGroup = new THREE.Group();

    // Bottom layer (chocolate base)
    const bottomGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 32);
    const bottomMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown
    const bottomLayer = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottomLayer.position.y = 0.25;
    cakeGroup.add(bottomLayer);

    // Middle layer (vanilla)
    const middleGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.6, 32);
    const middleMaterial = new THREE.MeshStandardMaterial({ color: 0xF5F5DC }); // Beige
    const middleLayer = new THREE.Mesh(middleGeometry, middleMaterial);
    middleLayer.position.y = 0.85;
    cakeGroup.add(middleLayer);

    // Top layer (frosting)
    const topGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.4, 32);
    const topMaterial = new THREE.MeshStandardMaterial({ color: 0xFFC0CB }); // Pink
    const topLayer = new THREE.Mesh(topGeometry, topMaterial);
    topLayer.position.y = 1.35;
    cakeGroup.add(topLayer);

    // Decorations (small spheres as cherries)
    const cherryGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const cherryMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 }); // Red
    for (let i = 0; i < 5; i++) {
        const cherry = new THREE.Mesh(cherryGeometry, cherryMaterial);
        const angle = (i / 5) * Math.PI * 2;
        cherry.position.set(Math.cos(angle) * 1.0, 1.55, Math.sin(angle) * 1.0);
        cakeGroup.add(cherry);
    }

    // Candle
    const candleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 32);
    const candleMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00 }); // Yellow
    const candle = new THREE.Mesh(candleGeometry, candleMaterial);
    candle.position.y = 1.95;
    cakeGroup.add(candle);

    return cakeGroup;
}

// Animation loop
function animate(renderer, scene, camera, controls, cake) {
    requestAnimationFrame(() => animate(renderer, scene, camera, controls, cake));

    // Continuous spin
    cake.rotation.y += 0.005;

    controls.update();
    renderer.render(scene, camera);
}

// Intro animation (spin in)
function introAnimation(cake, onComplete) {
    let scale = 0;
    const spinIn = () => {
        if (scale < 1) {
            scale += 0.02;
            cake.scale.set(scale, scale, scale);
            cake.rotation.y += 0.05; // Faster spin during intro
            requestAnimationFrame(spinIn);
        } else {
            onComplete();
        }
    };
    spinIn();
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    const { scene, camera, renderer, controls } = createScene('three-canvas');
    const cake = createCake();
    scene.add(cake);
    camera.position.z = 5;

    // Start intro animation, then loop
    introAnimation(cake, () => {
        animate(renderer, scene, camera, controls, cake);
    });
});
import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const fov = 75;  //field of view
const aspect = w/h; //aspect ratio
const near = 0.1; // near clipping planes
const far = 10; // far clipping planes
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2; //usally the camere position will be on x=0,y=0,z=0. so the object wont be visible.

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
// const mat = new THREE.MeshBasicMaterial({
//     color: 0Xccff
// });
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

function animate(t = 0) {
    requestAnimationFrame(animate);
    // mesh.scale.setScalar(Math.cos( t * 0.001) + 1.0);
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}

animate();
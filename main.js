import './style.css'

import * as THREE from 'three';

import {OrbitControls} from  'three/examples/jsm/controls/OrbitControls'
import { Material } from 'three';


//Scene
const scene = new THREE.Scene();
//Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
//Renderer
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-5);


renderer.render(scene, camera);


//Creating an object

//Geometry
const geometry = new THREE.TorusGeometry( 8, 3.8, 20, 100);
//material
const material = new THREE.MeshStandardMaterial({color:0xdd77aa})
//mesh (the glue)
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,-20)
const ambientLight = new THREE.AmbientLight(0xffffff)


scene.add(pointLight)
scene.add(ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50);

// scene.add(lightHelper);
// scene.add(gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

renderer.render(scene, camera);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,4,4)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  

  const [x,y,z] = randomArray(3,100);

  star.position.set(x,y,z)
  scene.add(star)
}

function randomArray(size, range){
  return Array(size).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
}

Array(200).fill().forEach(addStar)

//space background
const spaceTexture = new THREE.TextureLoader().load('sky2.JPG');
scene.background = spaceTexture;

//Avatar
const aliTexture = new THREE.TextureLoader().load('me.jpg');

const ali = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: aliTexture})
)
scene.add(ali)
ali.position.z = -5

//Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {map: moonTexture})
);
scene.add(moon);
moon.position.z = 30
moon.position.setX(-10)

function moveCamera() {
    const t = document.body.getBoundingClientRect().top//get users scroll position
    console.log(t)
    moon.rotation.x += 0.05
    moon.rotation.y += 0.075
    moon.rotation.z += 0.05

    ali.rotation.y += 0.01
    ali.rotation.z += 0.01

    let direction = 1;
    if(camera.position.z < 300){
      direction = -1;
    }
    else if(camera.position < -10){
      direction = 1
    }
    camera.position.y = t * -0.001;
    camera.position.x = t * -0.001;
    camera.position.z = t * 0.002*direction;

    

    
}

document.body.onscroll = moveCamera
moveCamera()

torus.position.z = -12


function animate(){
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.01
  torus.rotation.z += 0.01

  ali.rotation.y += 0.01

  

  //controls.update();

  renderer.render(scene, camera)
}
animate()
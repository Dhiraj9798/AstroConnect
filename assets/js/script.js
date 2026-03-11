/* ==========================================
ASTROCONNECT HERO COSMIC BACKGROUND
Particles + Subtle Solar System Motion
========================================== */

const canvas = document.querySelector("#webgl-canvas");

if(canvas){

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas:canvas,
alpha:true,
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

camera.position.z = 6;


/* ==========================================
PARTICLE BACKGROUND (original effect)
========================================== */

const particleCount = window.innerWidth < 768 ? 1500 : 3500;

const geometry = new THREE.BufferGeometry();

const positions = new Float32Array(particleCount*3);

for(let i=0;i<particleCount*3;i++){
positions[i] = (Math.random()-0.5)*12;
}

geometry.setAttribute(
"position",
new THREE.BufferAttribute(positions,3)
);

const material = new THREE.PointsMaterial({
size:0.02,
color:0x8892b0,
transparent:true,
opacity:0.8
});

const particles = new THREE.Points(geometry,material);

scene.add(particles);



/* ==========================================
SUN (very subtle center glow)
========================================== */

const sunGeometry = new THREE.SphereGeometry(0.25,16,16);

const sunMaterial = new THREE.MeshBasicMaterial({
color:0xffcc66
});

const sun = new THREE.Mesh(sunGeometry,sunMaterial);

scene.add(sun);



/* ==========================================
PLANETS (small subtle orbit)
========================================== */

const planets=[];

function createPlanet(size,distance,color){

const geometry = new THREE.SphereGeometry(size,8,8);

const material = new THREE.MeshBasicMaterial({color:color});

const planet = new THREE.Mesh(geometry,material);

planet.userData = {
distance:distance,
angle:Math.random()*Math.PI*2
};

scene.add(planet);

planets.push(planet);

}

/* small subtle planets */

createPlanet(0.03,1.2,0xaaaaaa);
createPlanet(0.04,1.6,0xff8844);
createPlanet(0.05,2.0,0x4488ff);
createPlanet(0.04,2.5,0xff5533);
createPlanet(0.07,3.0,0xffaa66);
createPlanet(0.06,3.6,0xffcc99);
createPlanet(0.05,4.1,0x66ccff);
createPlanet(0.05,4.7,0x3366ff);
createPlanet(0.03,5.3,0xffffff);



/* ==========================================
MOUSE INTERACTION
========================================== */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove",(event)=>{

mouseX = (event.clientX/window.innerWidth)-0.5;
mouseY = (event.clientY/window.innerHeight)-0.5;

});



/* ==========================================
ANIMATION LOOP
========================================== */

function animate(){

requestAnimationFrame(animate);

/* slow particle rotation */

particles.rotation.y += 0.0005;


/* mouse parallax */

particles.rotation.x += mouseY*0.0005;
particles.rotation.y += mouseX*0.0005;


/* slow solar orbit */

planets.forEach(planet=>{

planet.userData.angle += 0.002;

planet.position.x = Math.cos(planet.userData.angle)*planet.userData.distance;
planet.position.z = Math.sin(planet.userData.angle)*planet.userData.distance;

});


renderer.render(scene,camera);

}

animate();



/* ==========================================
RESPONSIVE CANVAS
========================================== */

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});

}
/* ==========================================
NAVBAR SCROLL EFFECT
Makes navbar dark after scrolling
========================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

if(window.scrollY > 80){
navbar.classList.add("scrolled");
}
else{
navbar.classList.remove("scrolled");
}

});
/* ==========================================
MOBILE MENU TOGGLE
========================================== */

const mobileBtn = document.getElementById("mobile-btn");
const navMenu = document.querySelector(".nav-links");

if(mobileBtn){

mobileBtn.addEventListener("click",()=>{

navMenu.classList.toggle("open");

});

}
/* ==========================================
   ASTROCONNECT PRO COSMIC ENGINE (WebGL/Three.js)
   Particles + 3D Solar System Motion
   ========================================== */

const canvas = document.querySelector("#webgl-canvas");

if (canvas) {
  /* ==========================================
     SCENE SETUP
     ========================================== */
  const scene = new THREE.Scene();

  // 1. CAMERA: Moved up and tilted down for that 3D perspective
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 6, 12); // Elevated y=6, pushed back z=12
  camera.lookAt(0, 0, 0); // Pointing at the sun

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true, // Crucial for high-end graphics
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* ==========================================
     LIGHTING
     ========================================== */
  // Ambient light so the dark side of planets isn't pitch black
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
  scene.add(ambientLight);

  // Intense light coming from the center (Sun)
  const sunLight = new THREE.PointLight(0xffedaa, 3, 50);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  /* ==========================================
     PARTICLE BACKGROUND (Stars with depth)
     ========================================== */
  const particleCount = window.innerWidth < 768 ? 2000 : 5000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 30; // Spread stars wider
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.03,
    color: 0xffffff,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending, // Makes stars glow when overlapping
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  /* ==========================================
     SUN (Glowing Center)
     ========================================== */
  // Core Sun
  const sunGeometry = new THREE.SphereGeometry(0.8, 64, 64); // High segment count for smoothness
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc33 });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  // Sun Glow Effect (Additive Blending)
  const glowGeometry = new THREE.SphereGeometry(1.2, 64, 64);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
  });
  const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);
  scene.add(sunGlow);

  /* ==========================================
     PLANET ORBIT RINGS (Thin, crisp lines)
     ========================================== */
  function createOrbit(radius) {
    const path = new THREE.Path();
    path.absarc(0, 0, radius, 0, Math.PI * 2, false);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(128));
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15, // Subtle lines like the reference
    });
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);
  }

  /* ==========================================
     PLANETS ENGINE
     ========================================== */
  const planets = [];

  function createPlanet(size, distance, color, speed, hasRing = false) {
    // High-poly spheres
    const geom = new THREE.SphereGeometry(size, 32, 32);
    // Standard Material reacts to the PointLight we created
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.7,
      metalness: 0.1,
    });

    const planet = new THREE.Mesh(geom, mat);
    
    // Create Saturn's Ring if requested
    if (hasRing) {
      const ringGeom = new THREE.RingGeometry(size * 1.4, size * 2.2, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2.2; // Tilt the ring a bit
      planet.add(ring);
    }

    // Group to handle rotation and orbit offset easily
    const planetGroup = new THREE.Group();
    planetGroup.userData = {
      distance: distance,
      angle: Math.random() * Math.PI * 2, // Random starting position
      speed: speed,
    };
    
    planetGroup.add(planet);
    scene.add(planetGroup);
    planets.push(planetGroup);

    /* create orbit ring */
    createOrbit(distance);
  }

  /* ==========================================
     CREATE SOLAR SYSTEM
     Sizes and distances scaled for visual appeal
     ========================================== */
  createPlanet(0.08, 1.8, 0xaaaaaa, 0.008);       // Mercury
  createPlanet(0.12, 2.6, 0xffaa55, 0.006);       // Venus
  createPlanet(0.14, 3.6, 0x2288ff, 0.005);       // Earth
  createPlanet(0.10, 4.6, 0xff4422, 0.004);       // Mars
  createPlanet(0.35, 6.2, 0xffcc88, 0.002);       // Jupiter
  createPlanet(0.28, 8.0, 0xffddaa, 0.0015, true); // Saturn (True = has rings)
  createPlanet(0.20, 9.8, 0x66ccff, 0.001);       // Uranus
  createPlanet(0.18, 11.2, 0x3366ff, 0.0008);     // Neptune

  /* ==========================================
     MOUSE INTERACTION (Parallax)
     ========================================== */
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
  });

  /* ==========================================
     ANIMATION LOOP
     ========================================== */
  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse parallax easing
    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;

    // Rotate stars slowly
    particles.rotation.y += 0.0002;
    // Apply smooth parallax to the whole scene
    scene.rotation.x += 0.05 * (targetY - scene.rotation.x);
    scene.rotation.y += 0.05 * (targetX - scene.rotation.y);

    // Animate planets along their orbits
    planets.forEach((planetGroup) => {
      planetGroup.userData.angle += planetGroup.userData.speed;
      planetGroup.position.x = Math.cos(planetGroup.userData.angle) * planetGroup.userData.distance;
      planetGroup.position.z = Math.sin(planetGroup.userData.angle) * planetGroup.userData.distance;
      
      // Slowly rotate the planet on its own axis
      planetGroup.children[0].rotation.y += 0.01; 
    });

    renderer.render(scene, camera);
  }

  animate();

  /* ==========================================
     RESPONSIVE CANVAS
     ========================================== */
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ==========================================
   NAVBAR & MENU TOGGLE
   ========================================== */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const mobileBtn = document.getElementById("mobile-btn");
const navMenu = document.querySelector(".nav-links");
if (mobileBtn) {
  mobileBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}
/* =========================================================
   ASTROCONNECT - UI LOGIC (Cards + Modal + Toggle)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ELEMENTS PICK KARO
    const modal = document.getElementById("authModal");
    const openBtn = document.getElementById("getStartedBtn");
    const closeBtn = document.getElementById("closeAuth");
    
    const tglLogin = document.getElementById("tglLogin");
    const tglReg = document.getElementById("tglReg");
    const loginForm = document.getElementById("loginForm");
    const regForm = document.getElementById("regForm");

    // 2. MODAL OPEN/CLOSE LOGIC
    if(openBtn && modal) {
        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.add("show");
            document.body.style.overflow = "hidden"; 
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    });

    // 3. FORM SWITCH LOGIC (BUG FIXED)
    if(tglReg && tglLogin) {
        tglReg.addEventListener("click", () => {
            tglReg.classList.add("active");
            tglLogin.classList.remove("active");
            regForm.classList.add("active");
            loginForm.classList.remove("active"); // Login hide hoga
        });

        tglLogin.addEventListener("click", () => {
            tglLogin.classList.add("active");
            tglReg.classList.remove("active");
            loginForm.classList.add("active");
            regForm.classList.remove("active"); // Register hide hoga
        });
    }

    // 4. CARDS FADE-IN LOGIC 
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                cardObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.fade-in-card').forEach(card => cardObserver.observe(card));
});
/* ==========================================
   FORM SWITCHING LOGIC (PRO VERSION)
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Elements ko dobara check karo
    const tglLogin = document.getElementById("tglLogin");
    const tglReg = document.getElementById("tglReg");
    const loginForm = document.getElementById("loginForm");
    const regForm = document.getElementById("regForm");

    // Check karo ki saare elements page par hain ya nahi
    if (tglLogin && tglReg && loginForm && regForm) {
        
        // --- NEW REGISTRATION CLICK ---
        tglReg.addEventListener("click", () => {
            console.log("Switching to Register..."); // Debugging ke liye
            
            // Buttons toggle
            tglReg.classList.add("active");
            tglLogin.classList.remove("active");
            
            // Forms toggle
            regForm.classList.add("active");
            loginForm.classList.remove("active");
        });

        // --- LOGIN CLICK ---
        tglLogin.addEventListener("click", () => {
            console.log("Switching to Login..."); // Debugging ke liye
            
            // Buttons toggle
            tglLogin.classList.add("active");
            tglReg.classList.remove("active");
            
            // Forms toggle
            loginForm.classList.add("active");
            regForm.classList.remove("active");
        });

    } else {
        console.error("Bug: Forms ya Toggle buttons ki ID nahi mil rahi!");
    }
});
/* =========================================================
   ABOUT SECTION: 3D ZODIAC STARFIELD (THREE.JS)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const bgContainer = document.getElementById("about-webgl-bg");
    
    if (bgContainer && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, bgContainer.clientWidth / bgContainer.clientHeight, 0.1, 100);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(bgContainer.clientWidth, bgContainer.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        bgContainer.appendChild(renderer.domElement);

        // Create Star Particles
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 800;
        const posArray = new Float32Array(starsCount * 3);
        const colorArray = new Float32Array(starsCount * 3);

        const color1 = new THREE.Color(0xffffff); // White stars
        const color2 = new THREE.Color(0xd8b2ff); // Light purple stars

        for(let i = 0; i < starsCount * 3; i+=3) {
            // Distribute stars in a spherical volume
            posArray[i] = (Math.random() - 0.5) * 25;     // x
            posArray[i+1] = (Math.random() - 0.5) * 25;   // y
            posArray[i+2] = (Math.random() - 0.5) * 25;   // z

            // Mix white and purple colors
            const mixedColor = Math.random() > 0.5 ? color1 : color2;
            colorArray[i] = mixedColor.r;
            colorArray[i+1] = mixedColor.g;
            colorArray[i+2] = mixedColor.b;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const starsMaterial = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const starMesh = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starMesh);

        // Mouse Parallax Effect
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener("mousemove", (event) => {
            // Only calculate if the user is hovering near the section to save performance
            const rect = bgContainer.getBoundingClientRect();
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                mouseX = (event.clientX / window.innerWidth) - 0.5;
                mouseY = (event.clientY / window.innerHeight) - 0.5;
            }
        });

        // Animation Loop
        function animateZodiacBg() {
            requestAnimationFrame(animateZodiacBg);
            
            // Subtle rotation of the starfield
            starMesh.rotation.y += 0.001;
            starMesh.rotation.z += 0.0005;

            // Parallax interaction
            scene.rotation.x += (mouseY * 0.2 - scene.rotation.x) * 0.05;
            scene.rotation.y += (mouseX * 0.2 - scene.rotation.y) * 0.05;

            renderer.render(scene, camera);
        }
        
        animateZodiacBg();

        // Responsive handling
        window.addEventListener('resize', () => {
            if(bgContainer.clientWidth > 0) {
                camera.aspect = bgContainer.clientWidth / bgContainer.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(bgContainer.clientWidth, bgContainer.clientHeight);
            }
        });
    }
});
/* =========================================================
   KUNDLI MAGNET: GALAXY BG & FORM LOGIC (THREE.JS)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. OPEN LOGIN MODAL ON FORM SUBMIT ---
    const kundliForm = document.getElementById("quickKundliForm");
    const authModal = document.getElementById("authModal");
    const tglReg = document.getElementById("tglReg");
    const tglLogin = document.getElementById("tglLogin");
    const regForm = document.getElementById("regForm");
    const loginForm = document.getElementById("loginForm");

    if (kundliForm) {
        kundliForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevents page reload
            
            if (authModal) {
                authModal.classList.add("show");
                document.body.style.overflow = "hidden";
                
                // Automatically switch to Registration form
                if (tglReg && regForm && loginForm && tglLogin) {
                    tglReg.classList.add("active");
                    tglLogin.classList.remove("active");
                    regForm.classList.add("active");
                    loginForm.classList.remove("active");
                }
            }
        });
    }

    // --- 2. THREE.JS 3D GALAXY BACKGROUND ---
    const galaxyContainer = document.getElementById("kundli-webgl-bg");
    
    if (galaxyContainer && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        
        // Use window innerWidth if container width isn't fully rendered yet
        const width = galaxyContainer.clientWidth || window.innerWidth;
        const height = galaxyContainer.clientHeight || 600;

        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.z = 30;
        camera.position.y = 10;
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        galaxyContainer.appendChild(renderer.domElement);

        // Create Galaxy Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 4000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorCore = new THREE.Color(0x9400d3); // Deep purple
        const colorEdge = new THREE.Color(0xffffff); // White

        for(let i = 0; i < count; i++) {
            const radius = Math.random() * 35;
            const spinAngle = radius * 0.4;
            const branchAngle = (i % 3) * ((Math.PI * 2) / 3);
            
            const randomX = (Math.random() - 0.5) * 3;
            const randomY = (Math.random() - 0.5) * 2;
            const randomZ = (Math.random() - 0.5) * 3;

            positions[i*3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i*3+1] = randomY * (35 / (radius + 1)); 
            positions[i*3+2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            // Blend colors
            const mixedColor = colorCore.clone();
            mixedColor.lerp(colorEdge, radius / 35);
            
            colors[i*3] = mixedColor.r;
            colors[i*3+1] = mixedColor.g;
            colors[i*3+2] = mixedColor.b;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });

        const galaxyMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(galaxyMesh);

        function animateGalaxy() {
            requestAnimationFrame(animateGalaxy);
            galaxyMesh.rotation.y -= 0.0015; // Slow rotation
            renderer.render(scene, camera);
        }
        
        animateGalaxy();

        window.addEventListener('resize', () => {
            if(galaxyContainer.clientWidth > 0) {
                camera.aspect = galaxyContainer.clientWidth / galaxyContainer.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(galaxyContainer.clientWidth, galaxyContainer.clientHeight);
            }
        });
    }
});
/* =========================================================
   TRUST CARDS: 3D SMOOTH HOVER TILT ANIMATION
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const trustCards = document.querySelectorAll(".trust-card");

    trustCards.forEach(card => {
        // Jab mouse card ke upar move kare
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            // Mouse ki position calculate karo card ke andar
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // X aur Y ka rotation degree (Max 8 degrees taaki smooth lage)
            const rotateX = ((y - centerY) / centerY) * -8; 
            const rotateY = ((x - centerX) / centerX) * 8;
            
            // Apply 3D transform instantly (no transition delay while moving)
            card.style.transition = "none";
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        // Jab mouse card se bahar jaye (Reset position)
        card.addEventListener("mouseleave", () => {
            // Smoothly wapas normal position par lao
            card.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });

        // Jab mouse enter kare (Initialize smooth catching)
        card.addEventListener("mouseenter", () => {
            card.style.transition = "transform 0.1s ease-out";
        });
    });
});
/* =========================================================
   ASTRO PREMIUM FOOTER: STARDUST WEBGL EFFECT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const fCanvas = document.getElementById("footer-cosmic-canvas");
    
    if (fCanvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        let width = fCanvas.clientWidth;
        let height = fCanvas.clientHeight;

        const camera = new THREE.PerspectiveCamera(60, width / height, 1, 100);
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        fCanvas.appendChild(renderer.domElement);

        // Create elegant stardust
        const particlesCount = 800;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        const color1 = new THREE.Color(0xb088f0); // Purple
        const color2 = new THREE.Color(0xffffff); // White
        const color3 = new THREE.Color(0xffd700); // Slight golden astrology hint

        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 50;
            positions[i+1] = (Math.random() - 0.5) * 20;
            positions[i+2] = (Math.random() - 0.5) * 20;

            const rand = Math.random();
            let mixColor = color2;
            if (rand > 0.6) mixColor = color1;
            if (rand > 0.9) mixColor = color3;

            colors[i] = mixColor.r;
            colors[i+1] = mixColor.g;
            colors[i+2] = mixColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const starField = new THREE.Points(geometry, material);
        scene.add(starField);

        // Smooth subtle animation
        let time = 0;
        function animateFooter() {
            requestAnimationFrame(animateFooter);
            time += 0.001;
            
            // Gentle drift and rotation
            starField.rotation.y = time * 0.5;
            starField.rotation.x = Math.sin(time) * 0.1;
            
            renderer.render(scene, camera);
        }
        animateFooter();

        window.addEventListener('resize', () => {
            if(fCanvas.clientWidth > 0) {
                width = fCanvas.clientWidth;
                height = fCanvas.clientHeight;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            }
        });
    }
});


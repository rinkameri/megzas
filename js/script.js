  // Инициализация Three.js
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('particles-container').appendChild(renderer.domElement);

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0xffffff,
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  camera.position.z = 10;

  function animate() {
      requestAnimationFrame(animate);

      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Функция для начала воспроизведения музыки
  function playMusic() {
      var audio = document.getElementById('background-music');
      audio.play().catch(function(e) {
          console.log('Автозапуск звука заблокирован, попробуйте кликнуть по экрану');
      });
  }

  // Воспроизведение музыки при любом клике на странице
  document.body.addEventListener('click', function() {
      playMusic();
  });

  // Плавная смена секций
  function navigateToSection(sectionId) {
      const sections = document.querySelectorAll('.section');
      sections.forEach((section, index) => {
          if (section.id === sectionId) {
              section.style.transform = `translateY(-${index * 100}vh)`;
          } else {
              section.style.transform = 'translateY(0)';
          }
      });

      // Закрываем меню при выборе пункта навигации
      toggleMenu();
  }

  // Функция для открытия/закрытия бургер-меню
  function toggleMenu() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('active');
  }
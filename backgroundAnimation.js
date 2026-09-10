// backgroundAnimation
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return console.warn('particles canvas not found');
  const ctx = canvas.getContext('2d');

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();

  const particles = [];
  const particleCount = Math.min(140, Math.floor(window.innerWidth / 8));

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.size = Math.random() * 2 + 0.6;
      this.opacity = Math.random() * 0.4 + 0.12;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,157,${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,255,157,${0.08 * (1 - dist / 100)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  window.addEventListener('resize', () => {
    setCanvasSize();
  });
})();

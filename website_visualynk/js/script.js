document.addEventListener("DOMContentLoaded", () => {

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
    // Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

  // Close menu when clicking a link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });
}

  // 3D Parallax (desktop only & no reduced motion)
  const hero = document.querySelector('.hero');
  if (hero && !isTouch && !prefersReducedMotion) {
    let px = 0, py = 0;

    document.addEventListener('mousemove', e => {
      px = (window.innerWidth / 2 - e.clientX) / 50;
      py = (window.innerHeight / 2 - e.clientY) / 50;
    });

    const animateParallax = () => {
      hero.style.transform = `rotateY(${px}deg) rotateX(${py}deg)`;
      requestAnimationFrame(animateParallax);
    };
    animateParallax();
  }

  // Scroll Reveal
  const revealElements = document.querySelectorAll('.section, .card, .portfolio-img');
  revealElements.forEach(el => el.classList.add('reveal-init'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal-active');
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  // Lightbox
  window.openLightbox = function (src) {
    const img = document.getElementById("lightbox-img");
    const box = document.getElementById("lightbox");
    if (img && box) {
      img.src = src;
      box.style.display = "flex";
      document.body.classList.add('lightbox-open');
    }
  };

  window.closeLightbox = function () {
    const box = document.getElementById("lightbox");
    if (box) {
      box.style.display = "none";
      document.body.classList.remove('lightbox-open');
    }
  };

  // AOS Init
  if (window.AOS && !prefersReducedMotion) {
    AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });
  }

  // Starfield Background (reduced on mobile)
  const canvas = document.getElementById('starfield');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let w, h, stars = [];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const STAR_COUNT = isTouch ? 80 : 200;

    stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * w
    }));

    function animateStars() {
      ctx.clearRect(0, 0, w, h);
      for (let s of stars) {
        s.z -= isTouch ? 1 : 2;
        if (s.z <= 0) s.z = w;

        const sx = (s.x - w / 2) * (w / s.z) + w / 2;
        const sy = (s.y - h / 2) * (w / s.z) + h / 2;
        const r = (w / s.z) * 1.3;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = '#00f5ff';
        ctx.fill();
      }
      requestAnimationFrame(animateStars);
    }
    animateStars();
  }

  // Cursor Glow (desktop only)
  const glow = document.querySelector('.cursor-glow');
  if (glow && !isTouch) {
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  } else if (glow) {
    glow.style.display = 'none';
  }

  // EmailJS
  if (window.emailjs) {
    emailjs.init("swGQFx2jcyaZYjbJr");

    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (form && status) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        status.innerText = "Sending...";

        emailjs.sendForm("service_cqqh3ay", "template_tnr44u4", this)
          .then(() => {
            status.innerText = "Message sent successfully!";
            this.reset();
          })
          .catch(() => {
            status.innerText = "Failed to send message. Please try again.";
          });
      });
    }
  }

});

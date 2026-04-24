/* ============================================================
   DESALINK — script.js
   ============================================================ */

// ---------- STAR FIELD CANVAS ----------
(function () {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    init();
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function init() {
    const count = Math.floor((W * H) / 4000);
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: rand(0, W),
        y: rand(0, H),
        r: rand(0.2, 1.4),
        alpha: rand(0.3, 1),
        speed: rand(0.0002, 0.0008),
        phase: rand(0, Math.PI * 2),
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    stars.forEach((s) => {
      const alpha = s.alpha * (0.6 + 0.4 * Math.sin(s.phase + t * s.speed * 1000));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();

// ---------- NAV SCROLL EFFECT ----------
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ---------- MOBILE MENU ----------
(function () {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('.mobile-menu__link').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
})();

// ---------- SCROLL REVEAL ----------
(function () {
  const targets = document.querySelectorAll(
    '.split__content, .steps__card, .testimonials__card, .order__plan, .support__card, .speedband__item, .coverage__inner'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  // Add base styles via JS to avoid FOUC if CSS loads late
  const style = document.createElement('style');
  style.textContent = `
    .split__content, .steps__card, .testimonials__card,
    .order__plan, .support__card, .speedband__item, .coverage__inner {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
    }
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .steps__card:nth-child(2) { transition-delay: 0.12s; }
    .steps__card:nth-child(3) { transition-delay: 0.24s; }
    .testimonials__card:nth-child(2) { transition-delay: 0.1s; }
    .testimonials__card:nth-child(3) { transition-delay: 0.2s; }
    .order__plan:nth-child(2) { transition-delay: 0.1s; }
    .order__plan:nth-child(3) { transition-delay: 0.2s; }
  `;
  document.head.appendChild(style);

  targets.forEach((el) => observer.observe(el));
})();

// ---------- AVAILABILITY CHECK (STUB) ----------
(function () {
  document.querySelectorAll('.hero__form, .order__form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const val = input.value.trim();
      if (!val) {
        input.focus();
        return;
      }
      // Replace this stub with a real API call when ready
      alert(`Thanks! We'll check availability for "${val}" and get back to you via WhatsApp or email within 24 hours.`);
      input.value = '';
    });
  });
})();

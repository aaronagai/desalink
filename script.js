/* ============================================================
   DESALINK — script.js
   ============================================================ */

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
    '.split__content, .steps__card, .order__plan, .support__card, .speedband__item'
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

  const style = document.createElement('style');
  style.textContent = `
    .split__content, .steps__card, .order__plan, .support__card, .speedband__item {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
    }
    .revealed { opacity: 1 !important; transform: translateY(0) !important; }
    .steps__card:nth-child(2) { transition-delay: 0.12s; }
    .steps__card:nth-child(3) { transition-delay: 0.24s; }
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
      if (!val) { input.focus(); return; }
      alert(`Thanks! We'll check availability for "${val}" and get back to you via WhatsApp or email within 24 hours.`);
      input.value = '';
    });
  });
})();

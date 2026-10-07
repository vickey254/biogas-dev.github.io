/* ===== KIAMBATI BIOGAS — script.js ===== */

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 140;
  sections.forEach(sec => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      navItems.forEach(n => n.classList.toggle('active', n.getAttribute('href') === '#' + sec.id));
    }
  });
});

// Animated counters
const counters = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      current += step;
      if (current >= target) { el.textContent = target + (target >= 100 ? '' : '+'); }
      else { el.textContent = current; requestAnimationFrame(tick); }
    };
    tick();
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!wasOpen) {
      item.classList.add('open');
      const a = item.querySelector('.faq-a');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// Cost estimator
const PRICES = {
  1:  { size: '3 – 4 m³ digester', cost: 'KSh 45,000 – 80,000',   output: 'Cooks for a family of 4–6 daily' },
  4:  { size: '6 – 8 m³ digester', cost: 'KSh 85,000 – 150,000',  output: 'Cooks for a family + small dairy farm' },
  9:  { size: '10 – 16 m³ digester', cost: 'KSh 150,000 – 300,000', output: 'School, hotel or large farm kitchens' },
  21: { size: '20 m³+ industrial system', cost: 'KSh 300,000 – 600,000+', output: 'Institutions, factories, commercial use' }
};
document.getElementById('calcBtn').addEventListener('click', () => {
  const data = PRICES[document.getElementById('cows').value];
  const box = document.getElementById('calcResult');
  box.innerHTML = `
    <h4>Recommended: ${data.size}</h4>
    <p>💰 Estimated cost: <strong>${data.cost}</strong></p>
    <p>🔥 ${data.output}</p>
    <p style="margin-top:.5rem">📞 Call <a href="tel:+254723051086" style="color:var(--green);font-weight:600">+254 723 051 086</a> for your free site visit & exact quote.</p>`;
  box.classList.add('show');
});

// Contact form → WhatsApp
document.getElementById('quoteForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const msg =
`Hello James, I'd like a FREE biogas quote.
👤 Name: ${f.get('name')}
📞 Phone: ${f.get('phone')}
🏗️ Type: ${f.get('type')}
📍 Location: ${f.get('location')}
📝 Details: ${f.get('message') || 'N/A'}`;
  window.open('https://wa.me/254723051086?text=' + encodeURIComponent(msg), '_blank');
});

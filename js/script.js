// Main JS for the demo single-page Arabic site
// Handles: sticky header, smooth offset scroll, scroll animations, contact form (frontend-only), WhatsApp behavior

document.addEventListener('DOMContentLoaded', function () {
  // Cached elements
  const header = document.getElementById('siteHeader');
  const ctaContact = document.getElementById('ctaContact');
  const navLinks = document.querySelectorAll('.nav a');
  const whatsFloat = document.getElementById('whatsAppFloat');
  const heroWhats = document.getElementById('heroWhatsApp');
  const formWhats = document.getElementById('formWhatsApp');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  // Phone number placeholder — replace in production
  const waNumber = '+966501234567';
  const waText = encodeURIComponent('مرحباً، أود الاستفسار عن خدماتكم.');
  const waLink = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${waText}`;

  // Smooth scroll with offset to account for sticky header
  function scrollToHash(hash) {
    const el = document.querySelector(hash);
    if (!el) return;
    const headerOffset = header.offsetHeight + 8;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
  }

  // Attach to nav links
  navLinks.forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      scrollToHash(href);
      if (window.innerWidth < 640 && nav) nav.style.display = 'none';
    });
  });

  // CTA contact scroll
  ctaContact.addEventListener('click', () => scrollToHash('#contact'));

  // Shrink header on scroll
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Scroll animations using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // WhatsApp interactions — show alert then open wa link
  function handleWhats(e) {
    alert('هذا موقع تجريبي. هذه الميزة تعمل بالكامل في النسخة الإنتاجية.');
    // Open WhatsApp link in new tab (still fine for demo)
    window.open(waLink, '_blank');
  }
  whatsFloat.addEventListener('click', handleWhats);
  if (heroWhats) heroWhats.addEventListener('click', handleWhats);
  if (formWhats) formWhats.addEventListener('click', handleWhats);

  // Contact form frontend-only simulation
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Simulate sending
    formStatus.textContent = '...جاري الإرسال';
    setTimeout(() => {
      formStatus.textContent = 'تم إرسال رسالتك بنجاح (محاكاة).';
      contactForm.reset();
    }, 900);
  });

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (nav.style.display === 'flex') { nav.style.display = 'none' } else { nav.style.display = 'flex'; nav.style.flexDirection = 'column' }
    });
  }
});


  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Journey path draw-on-scroll
  const journeyPath = document.getElementById('journeyPath');
  const journeyWrap = document.getElementById('journeyWrap');
  const jio = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        journeyPath.classList.add('in');
        jio.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  jio.observe(journeyWrap);

  // Back to top button visibility
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
// EmailJS
emailjs.init({
  publicKey: 'uc7tC9_2WITBulFL-'
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
contactForm.addEventListener('submit', function (event) {
  event.preventDefault();
formStatus.textContent = 'Sending...';
formStatus.className = 'form-status sending';

  emailjs.sendForm(
    'service_gi3nmj7',
    'template_99gn50a',
    this
  )
  .then(() => {
    formStatus.textContent = '✓ Message sent successfully!';
    formStatus.className = 'form-status success';
    contactForm.reset();
  })
  .catch((error) => {
   console.error('EmailJS Error:', error);
    formStatus.textContent = '✕ Failed to send message. Please try again.';
    formStatus.className = 'form-status error';
  });
});
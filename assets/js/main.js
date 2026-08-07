const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  const updateHeader = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 60);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Deschide meniul');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Deschide meniul' : 'Închide meniul');
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (event) => {
    if (menuButton.getAttribute('aria-expanded') === 'true' && !siteHeader.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('[data-reveal]').forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('is-visible');
});

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-item').forEach((otherItem) => {
      otherItem.classList.remove('is-open');
      otherItem.querySelector('button').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const message = [
      'Bună ziua! Am nevoie de asistență rutieră.',
      `Nume: ${data.get('name')}`,
      `Telefon: ${data.get('phone')}`,
      `Locație: ${data.get('location')}`,
      `Vehicul: ${data.get('vehicle') || 'Nespecificat'}`,
      `Serviciu: ${data.get('service')}`,
      `Detalii: ${data.get('details') || 'Fără alte detalii'}`
    ].join('\n');

    window.open(`https://wa.me/40751164175?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
}

/* Progressive enhancements; content and resource links also work without JS. */
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header-inner')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
const navigationLinks = Array.from(navigation.querySelectorAll('a[href^="#"]'));
const sections = navigationLinks.map((link) => document.querySelector(link.getAttribute('href')));
let scrollQueued = false;
function updateNavigation() {
  const threshold = document.querySelector('.site-header').offsetHeight + 130;
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) active = section;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) active = sections[sections.length - 1];
  for (const link of navigationLinks) {
    if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {
    scrollQueued = true;
    window.requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
// Native dialog supplies focus containment, Escape dismissal, and focus return.
const lightbox = document.querySelector('.lightbox');
if (typeof lightbox.showModal === 'function') {
  const links = Array.from(document.querySelectorAll('[data-lightbox]'));
  const image = lightbox.querySelector('.lightbox-image');
  const caption = lightbox.querySelector('figcaption');
  const count = lightbox.querySelector('.lightbox-count');
  let gallery = [];
  let current = 0;
  function showImage(index) {
    current = (index + gallery.length) % gallery.length;
    const link = gallery[current];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    caption.textContent = link.dataset.caption;
    count.textContent = `${current + 1} / ${gallery.length}`;
  }
  for (const link of links) {
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      gallery = Array.from(link.closest('section').querySelectorAll('[data-lightbox]'));
      showImage(gallery.indexOf(link));
      lightbox.showModal();
      document.body.classList.add('modal-open');
    });
  }
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showImage(current - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(current + 1));
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  lightbox.addEventListener('click', (event) => {
    const bounds = lightbox.getBoundingClientRect();
    if (event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    image.removeAttribute('src');
  });
}
document.querySelector('#copyright-year').textContent = new Date().getFullYear();

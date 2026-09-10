const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('#site-menu');
const progressBar = document.querySelector('.scroll-progress span');
const sections = [...document.querySelectorAll('main section[id], footer[id]')];
const navLinks = [...document.querySelectorAll('#site-menu a')];
const revealItems = document.querySelectorAll('.section, .project, .timeline article, .education-list p');

menuToggle?.addEventListener('click', () => {
  const isOpen = body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const updateScrollState = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
  document.querySelector('.nav')?.classList.toggle('is-scrolled', window.scrollY > 24);
};

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll('.filter').forEach((filterButton) => {
  filterButton.addEventListener('click', () => {
    const category = filterButton.dataset.filter;
    document.querySelectorAll('.filter').forEach((button) => button.classList.toggle('active', button === filterButton));
    document.querySelectorAll('.project').forEach((project) => {
      const shouldShow = category === 'all' || project.dataset.category === category;
      project.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
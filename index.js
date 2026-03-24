import templateUtils from './scripts/templateUtils.js';

templateUtils.addRoutes('/', 'homeTemplate');
templateUtils.addRoutes('/login', 'loginTemplate');
templateUtils.addRoutes('/register', 'registerTemplate');

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const link = e.target.closest('a[data-link]');
    const url = new URL(link.href);

    if (url.origin !== location.origin) {
      return;
    }
    e.preventDefault();

    templateUtils.navigate(url.pathname);
  }
});

window.addEventListener('popState', () => {
  templateUtils.render(location.pathname);
});

templateUtils.render(location.pathname);

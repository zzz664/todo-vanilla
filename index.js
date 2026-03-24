import templateUtils from './scripts/templateUtils.js';
import { setupHome } from './scripts/home.js';
import { setupLogin } from './scripts/login.js';
import { setupRegister } from './scripts/register.js';

templateUtils.addRoutes('/', 'homeTemplate', setupHome);
templateUtils.addRoutes('/login', 'loginTemplate', setupLogin);
templateUtils.addRoutes('/register', 'registerTemplate', setupRegister);

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

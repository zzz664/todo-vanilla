import templateUtils from './templateUtils.js';
import { setupHome } from './home.js';
import { setupLogin } from './login.js';
import { setupRegister } from './register.js';

templateUtils.addRoutes('/', 'homeTemplate', setupHome);
templateUtils.addRoutes('#/login', 'loginTemplate', setupLogin);
templateUtils.addRoutes('#/register', 'registerTemplate', setupRegister);

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const link = e.target.closest('a[data-link]');
    const url = new URL(link.href);
    console.log(url);

    if (url.origin !== location.origin) {
      return;
    }
    e.preventDefault();
    const path = url.hash ? url.hash : url.pathname;

    templateUtils.navigate(path);
  }
});

window.addEventListener('popState', () => {
  const path = location.hash ? location.hash : location.pathname;
  templateUtils.render(path);
});
const path = location.hash ? location.hash : location.pathname;
templateUtils.render(path);

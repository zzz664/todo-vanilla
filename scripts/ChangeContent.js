const home = document.getElementById('home');
const login = document.getElementById('login');
const register = document.getElementById('register');

export function ChangeContent(id) {
  switch (id) {
    case 'loginPageBtn':
      if (!login.classList.contains('hidden')) {
        break;
      }
      home.classList.add('hidden');
      login.classList.remove('hidden');
      register.classList.add('hidden');
      break;
    case 'registerPageBtn':
      if (!register.classList.contains('hidden')) {
        break;
      }
      home.classList.add('hidden');
      register.classList.remove('hidden');
      login.classList.add('hidden');
      break;
  }
}

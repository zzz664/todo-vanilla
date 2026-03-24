function CheckAuth() {
  return localStorage.getItem('token') ? true : false;
}

function ControllAuthButton() {
  const loginBtn = document.getElementById('loginPageBtn');
  const registerBtn = document.getElementById('registerPageBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  if (CheckAuth()) {
    loginBtn.classList.add('hidden');
    registerBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
  } else {
    loginBtn.classList.remove('hidden');
    registerBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
  }
}

export default { CheckAuth, ControllAuthButton };

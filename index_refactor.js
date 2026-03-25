import { API_BASE_URL } from './scripts_refactor/Constants.js';

let token = localStorage.getItem('token');
const appContent = document.getElementById('appContent');
const ul = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');

if (!token) {
  renderRequireLoginRegister();
}

if (!checkAuth()) {
  renderRequireLoginRegister();
}

async function checkAuth() {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { success } = await res.json();

  return success;
}

function renderRequireLoginRegister() {
  const unAuthWarnTemplate = document.getElementById('unAuthWarn');
  const requireLoginRegister = unAuthWarnTemplate.content.cloneNode(true);

  todoInput.querySelector('#todoFormFieldset').disabled = true;

  appContent.appendChild(requireLoginRegister);
}

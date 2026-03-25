import { API_BASE_URL } from '../scripts_refactor/Constants.js';

const userId = document.getElementById('userId');
const userPassword = document.getElementById('userPassword');

function validation(info) {
  let message = '';
  let status = true;

  if (info.username.length === 0 || info.password.length === 0) {
    message += '빈 칸을 채워주세요.';
    status = false;
  }

  return { status, message };
}

async function login(info) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });

  const { success, message, data } = await res.json();

  if (!success) {
    throw new Error(message);
  }

  localStorage.setItem('token', data.token);
}

document.addEventListener('submit', async (e) => {
  if (e.target.id === 'loginForm') {
    e.preventDefault();

    const info = {
      username: userId.value.trim(),
      password: userPassword.value.trim(),
    };

    const { status: validationStatus, message: validationMessage } =
      validation(info);
    if (!validationStatus) {
      alert(validationMessage);
      return;
    }

    try {
      await login(info);

      if (confirm('로그인에 성공했습니다.')) {
        location.replace('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
});

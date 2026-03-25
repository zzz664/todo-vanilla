import {
  API_BASE_URL,
  ID_REG,
  NICK_REG,
  PW_REG,
} from '../scripts_refactor/Constants.js';

const userId = document.getElementById('userId');
const userPassword = document.getElementById('userPassword');
const userNickname = document.getElementById('userNickname');

function validation(info) {
  let message = '';
  let status = true;

  if (!ID_REG.test(info.username)) {
    message += '아이디는 4~20자 영문/숫자 조합이여야 합니다.\n';
    status = false;
  }

  if (!PW_REG.test(info.password)) {
    message +=
      '비밀번호는 4~20자 영문/숫자/특수문자(선택) 조합이여야 합니다.\n';
    status = false;
  }

  if (!NICK_REG.test(info.nickname)) {
    message += '닉네임은 2~20자 한글/영문/숫자 조합이여야 합니다.\n';
    status = false;
  }

  return { status, message };
}

async function register(info) {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
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
}

document.addEventListener('submit', async (e) => {
  if (e.target.id === 'registerForm') {
    e.preventDefault();

    const info = {
      username: userId.value.trim(),
      password: userPassword.value.trim(),
      nickname: userNickname.value.trim(),
    };

    const { status: validationStatus, message: validationMessage } =
      validation(info);
    if (!validationStatus) {
      alert(validationMessage);
      return;
    }

    try {
      await register(info);

      if (confirm('회원가입에 성공했습니다.')) {
        location.replace('/login');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
});

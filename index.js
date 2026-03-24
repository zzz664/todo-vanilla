import { ChangeContent } from './scripts/ChangeContent.js';
import { CheckLoginInfo } from './scripts/CheckLoginInfo.js';
import { CheckRegisterInfo } from './scripts/CheckRegisterInfo.js';
import { Login } from './scripts/login.js';
import { Register } from './scripts/register.js';
import Modal from './scripts/Modal.js';
import Auth from './scripts/ControllAuthButton.js';

document.addEventListener('DOMContentLoaded', () => {
  Auth.ControllAuthButton();

  if (Auth.CheckAuth()) {
    const home = document.getElementById('todoList');
    const element = document.createElement('div');
    element.className = 'todo';
    element.textContent = 'todo List';
    home.replaceChildren(element);
  } else {
    const home = document.getElementById('todoList');
    const element = document.createElement('div');
    element.className = 'notAuth';
    element.style.whiteSpace = 'pre-wrap';
    element.style.textAlign = 'center';
    element.textContent =
      '로그인 상태가 아닙니다.\n목록을 추가하려면 로그인하십시오.';
    home.replaceChildren(element);
  }
});

document.addEventListener('click', (e) => {
  const id = e.target.id;

  if (id === 'loginPageBtn' || id === 'registerPageBtn') {
    ChangeContent(e.target.id);
  }

  if (id === 'logoutBtn') {
    localStorage.removeItem('token');
    location.reload();
  }

  if (id === 'modalCloseBtn' || id === 'modal') {
    Modal.close();
  }
});

document.addEventListener('submit', async (e) => {
  if (e.target.tagName === 'FORM') {
    const id = e.target.id;
    e.preventDefault();

    switch (id) {
      case 'loginForm':
        Modal.setTitle('로그인');
        const loginId = document.getElementById('loginId').value.trim();
        const loginPw = document.getElementById('loginPassword').value.trim();
        const loginInfo = {
          id: loginId,
          pw: loginPw,
        };

        const loginValidation = CheckLoginInfo(loginInfo);

        if (!loginValidation.status) {
          Modal.setContent(loginValidation.message);
          Modal.show();
          break;
        }

        try {
          const loginResult = await Login(loginInfo);
          location.reload();
          Auth.ControllAuthButton();
          break;
        } catch (error) {
          Modal.setContent(error.message);
          Modal.show();
          break;
        }
      case 'registerForm':
        Modal.setTitle('회원가입');
        const registerId = document.getElementById('registerId').value.trim();
        const registerPw = document
          .getElementById('registerPassword')
          .value.trim();
        const registerNick = document
          .getElementById('registerNickname')
          .value.trim();
        const registerInfo = {
          id: registerId,
          pw: registerPw,
          nick: registerNick,
        };
        const registerValidation = CheckRegisterInfo(registerInfo);

        if (!registerValidation.status) {
          Modal.setContent(registerValidation.message);
          Modal.show();
          break;
        }

        try {
          const registerResult = await Register(registerInfo);
          Modal.setContent(registerResult.message);
          Modal.show();
          ChangeContent('loginPageBtn');
          break;
        } catch (error) {
          Modal.setContent(error.message);
          Modal.show();
          break;
        }
    }
  }
});

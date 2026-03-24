import { ChangeContentByButton } from './scripts/ChangeContent.js';
import Modal from './scripts/Modal.js';

document.addEventListener('click', (e) => {
  const id = e.target.id;

  if (id === 'loginPageBtn' || id === 'registerPageBtn') {
    ChangeContentByButton(e.target.id);
  }

  if (id === 'modalCloseBtn' || id === 'modal') {
    Modal.close();
  }
});

document.addEventListener('submit', (e) => {
  if (e.target.tagName === 'FORM') {
    const id = e.target.id;
    e.preventDefault();

    switch (id) {
      case 'loginForm':
        const loginId = document.getElementById('loginId').value.trim();
        const loginPw = document.getElementById('loginPassword').value.trim();
        console.log(loginId + ' ' + loginPw);
        break;
      case 'registerForm':
        let check = true;
        let error = '';
        const registerId = document.getElementById('registerId').value.trim();
        const registerPw = document
          .getElementById('registerPassword')
          .value.trim();
        const registerNick = document
          .getElementById('registerNickname')
          .value.trim();
        if (!window.APP_CONFIG.ID_REG.test(registerId)) {
          error += '아이디 조건 안맞음\n';
          check = false;
        }

        if (!window.APP_CONFIG.PW_REG.test(registerPw)) {
          error += '비밀번호 조건 안맞음\n';
          check = false;
        }

        if (!window.APP_CONFIG.NICK_REG.test(registerNick)) {
          error += '닉네임 조건 안맞음\n';
          check = false;
        }

        if (!check) {
          Modal.setTitle('회원가입');
          Modal.setContent(error);
          Modal.show();
          break;
        }

        console.log('조건 다 맞음');

        break;
    }
  }
});

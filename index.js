import { ChangeContent } from './scripts/ChangeContent.js';
import { CheckRegisterInfo } from './scripts/CheckRegisterInfo.js';
import Modal from './scripts/Modal.js';
import { Register } from './scripts/register.js';

document.addEventListener('click', (e) => {
  const id = e.target.id;

  if (id === 'loginPageBtn' || id === 'registerPageBtn') {
    ChangeContent(e.target.id);
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
        const loginId = document.getElementById('loginId').value.trim();
        const loginPw = document.getElementById('loginPassword').value.trim();
        console.log(loginId + ' ' + loginPw);
        break;
      case 'registerForm':
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
        const validationResult = CheckRegisterInfo(registerInfo);

        if (!validationResult.status) {
          Modal.setTitle('회원가입');
          Modal.setContent(validationResult.message);
          Modal.show();
          break;
        }

        try {
          const registerResult = await Register(registerInfo);
          Modal.setTitle('회원가입');
          Modal.setContent(registerResult.message);
          Modal.show();
          ChangeContent('loginPageBtn');
          break;
        } catch (error) {
          Modal.setTitle('회원가입');
          Modal.setContent(error.message);
          Modal.show();
          break;
        }
    }
  }
});

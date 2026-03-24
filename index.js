import { ChangeContent } from './scripts/ChangeContent.js';
import { CheckLoginInfo } from './scripts/CheckLoginInfo.js';
import { CheckRegisterInfo } from './scripts/CheckRegisterInfo.js';
import { Login } from './scripts/login.js';
import { Register } from './scripts/register.js';
import Modal from './scripts/Modal.js';

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
          Modal.setContent(loginResult.message);
          Modal.show();
          ChangeContent('homePage');
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

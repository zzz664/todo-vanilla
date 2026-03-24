export function CheckRegisterInfo(info) {
  let message = '';
  let status = true;

  if (!window.APP_CONFIG.ID_REG.test(info.id)) {
    message += '아이디는 4~20자 영문/숫자 조합이여야 합니다.\n';
    status = false;
  }

  if (!window.APP_CONFIG.PW_REG.test(info.pw)) {
    message +=
      '비밀번호는 4~20자 영문/숫자/특수문자(선택) 조합이여야 합니다.\n';
    status = false;
  }

  if (!window.APP_CONFIG.NICK_REG.test(info.nick)) {
    message += '닉네임은 2~20자 한글/영문/숫자 조합이여야 합니다.\n';
    status = false;
  }

  return { status, message };
}

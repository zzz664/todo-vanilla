export async function Register(info) {
  const reqData = {
    username: info.id,
    password: info.pw,
    nickname: info.nick,
  };
  const res = await fetch(`${window.APP_CONFIG.API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqData),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return { status: data.success, message: '회원가입에 성공했습니다.' };
}

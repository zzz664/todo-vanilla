export async function Login(info) {
  const reqData = {
    username: info.id,
    password: info.pw,
  };
  const res = await fetch(`${window.APP_CONFIG.API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqData),
  });

  const { success, message, data } = await res.json();

  if (!success) {
    throw new Error(message);
  }

  localStorage.setItem('token', data.token);

  return { status: data.success, message: '로그인에 성공했습니다.' };
}

export function CheckLoginInfo(info) {
  let message = '';
  let status = true;

  if (info.id.length === 0 || info.pw.length === 0) {
    message += '빈 칸을 채워주세요.';
    status = false;
  }

  return { status, message };
}

export function CheckTodo(todo) {
  let message = '';
  let status = true;

  if (
    todo.title.length === 0 ||
    todo.description.length === 0 ||
    todo.dueDate.length === 0
  ) {
    message += '빈 칸이 있으면 할 일을 등록할 수 없습니다.\n';
    status = false;
  }

  return { status, message };
}

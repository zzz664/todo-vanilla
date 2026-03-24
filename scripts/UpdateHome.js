import Auth from './ControllAuthButton.js';
import Modal from './Modal.js';
import TodoList from './TodoList.js';

export async function UpdateHome() {
  Auth.ControllAuthButton();

  const todoList = document.getElementById('todoList');
  const todoForm = document.getElementById('todoForm');
  const todoFormFieldset = document.getElementById('todoFormFieldset');

  if (Auth.CheckAuth()) {
    todoFormFieldset.disabled = false;

    try {
      const loadResult = await TodoList.Load();
      TodoList.Build(loadResult.data);
    } catch (error) {
      Modal.setTitle('Todo List');
      Modal.setContent(error.message);
      Modal.show();
      return;
    }
  } else {
    todoFormFieldset.disabled = true;
    const element = document.createElement('li');
    element.className = 'notAuth';
    element.style.whiteSpace = 'pre-wrap';
    element.style.textAlign = 'center';
    element.textContent =
      '로그인 상태가 아닙니다.\n목록을 추가하려면 로그인하십시오.';
    todoList.replaceChildren(element);
  }
}

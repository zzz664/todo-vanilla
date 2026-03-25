import { API_BASE_URL } from './scripts_refactor/Constants.js';
import { TodoItem } from './scripts_refactor/TodoItem.js';

let token = localStorage.getItem('token');
const appContent = document.getElementById('appContent');
const ul = document.getElementById('todoList');
const todoInputFieldset = document.getElementById('todoFormFieldset');

if (!token) {
  renderRequireLoginRegister();
} else if (!checkAuth()) {
  renderRequireLoginRegister();
}

const newTodoTitle = document.getElementById('newTodoTitle');
const newTodoDescription = document.getElementById('newTodoDescription');
const newTodoPriority = document.getElementById('newTodoPriority');
const newTodoDueDate = document.getElementById('newTodoDueDate');
const todoListMap = new Map();

newTodoTitle.focus();

document.addEventListener('submit', (e) => {
  if (e.target.id === 'todoForm') {
    e.preventDefault();

    if (!checkTodoInput()) {
      alert('할 일을 추가하려면 제목은 반드시 입력해야합니다.');
      return;
    }

    addTodoItem();
  }
});

async function checkAuth() {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { success } = await res.json();

  return success;
}

function renderRequireLoginRegister() {
  const unAuthWarnTemplate = document.getElementById('unAuthWarn');
  const requireLoginRegister = unAuthWarnTemplate.content.cloneNode(true);

  todoInputFieldset.disabled = true;

  appContent.appendChild(requireLoginRegister);
}

function checkTodoInput() {
  if (newTodoTitle.value.length === 0) {
    return false;
  }
  return true;
}

async function addTodoItem() {
  const reqData = {
    title: newTodoTitle.value,
    priority: newTodoPriority.value,
  };

  if (newTodoDescription.value) {
    reqData[description] = newTodoDescription.value;
  }

  if (newTodoDueDate.value) {
    reqData[dueDate] = newTodoDueDate.value;
  }

  const res = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqData),
  });

  const { success, message, data } = await res.json();

  if (!success) {
    throw new Error(message);
  }

  todoListMap.set(data.id, new TodoItem(data));
}

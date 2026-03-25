import { API_BASE_URL } from './scripts_refactor/Constants.js';
import { TodoItem } from './scripts_refactor/TodoItem.js';

let token = localStorage.getItem('token');
const appContent = document.getElementById('appContent');
const todoList = document.getElementById('todoList');
const todoInputFieldset = document.getElementById('todoFormFieldset');
const todoListMap = new Map();

if (!token) {
  renderRequireLoginRegister();
} else if (!checkAuth()) {
  renderRequireLoginRegister();
} else {
  renderLoading();

  const newTodoTitle = document.getElementById('newTodoTitle');
  const newTodoDescription = document.getElementById('newTodoDescription');
  const newTodoPriority = document.getElementById('newTodoPriority');
  const newTodoDueDate = document.getElementById('newTodoDueDate');

  newTodoTitle.focus();

  const todoListPromise = loadTodoListFromServer();
  todoListPromise.then((data) => {
    if (data.length === 0) {
      renderEmpty();
    } else {
      updateTodoList(data);
      todoList.firstElementChild.remove();
      renderTodoList();
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.id === 'todoForm') {
      e.preventDefault();

      if (!checkTodoInput()) {
        alert('할 일을 추가하려면 제목은 반드시 입력해야합니다.');
        return;
      }

      addTodoItem();

      newTodoTitle.value = '';
      newTodoDescription.value = '';
      newTodoPriority.value = 'MEDIUM';
      newTodoDueDate.value = '';
    }
  });
}
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

function renderLoading() {
  const loadingTemplate = document.getElementById('loadingTemplate');
  const loading = loadingTemplate.content.cloneNode(true);

  todoList.appendChild(loading);
}

function renderEmpty() {
  const emptyTemplate = document.getElementById('emptyTemplate');
  const emptyTodoList = emptyTemplate.content.cloneNode(true);

  todoList.replaceChildren(emptyTodoList);
}

function renderTodoList() {
  const todoItems = [...todoListMap.values()];

  todoItems.sort((a, b) => {
    const priority = {
      HIGH: 3,
      MEDIUM: 2,
      LOW: 1,
    };

    const aData = a.get();
    const bData = b.get();

    const priorityDiff = priority[bData.priority] - priority[aData.priority];

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return bData.id - aData.id;
  });

  todoItems.forEach((todoItem) => {
    todoList.appendChild(todoItem.getElement());
  });
}

function updateTodoList(data) {
  for (let todo of data) {
    todoListMap.set(todo.id, new TodoItem(todo));
  }
}

function checkTodoInput() {
  if (newTodoTitle.value.length === 0) {
    return false;
  }
  return true;
}

async function loadTodoListFromServer() {
  const res = await fetch(`${API_BASE_URL}/todos`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { success, message, data } = await res.json();

  if (!success) {
    throw new Error(message);
  }

  return data;
}

async function addTodoItem() {
  const reqData = {
    title: newTodoTitle.value,
    priority: newTodoPriority.value,
  };

  if (newTodoDescription.value) {
    reqData.description = newTodoDescription.value;
  }

  if (newTodoDueDate.value) {
    reqData.dueDate = newTodoDueDate.value;
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
  renderTodoList();
}

let modifyId = null;

async function Load() {
  const res = await fetch(`${window.APP_CONFIG.API_BASE_URL}/todos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const { success, message, data } = await res.json();

  if (!success) {
    throw new Error(message);
  }

  return { status: success, message, data };
}

function Build(data) {
  const todoList = document.getElementById('todoList');

  if (data.length === 0) {
    const element = document.createElement('li');
    element.className = 'noItem';
    element.textContent = '할 일이 없습니다.';
    todoList.replaceChildren(element);
  } else {
    data.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.className = 'todoItem';

      const todoId = document.createElement('input');
      todoId.className = 'todoId hidden';
      todoId.value = item.id;

      const todoTitle = document.createElement('strong');
      todoTitle.className = 'todoTitle';
      todoTitle.textContent = item.title;

      const todoDesc = document.createElement('p');
      todoDesc.className = 'todoDesc';
      todoDesc.textContent = item.description;

      const todoCompleted = document.createElement('span');
      todoCompleted.className = 'todoCompleted';
      todoCompleted.textContent = item.completed ? '완료' : '미완료';

      const todoPriority = document.createElement('span');
      todoPriority.className = 'todoPriority';
      todoPriority.textContent =
        item.priority === 'HIGH'
          ? '높음'
          : item.priority === 'MEDIUM'
            ? '중간'
            : '낮음';

      const todoDueDate = document.createElement('span');
      todoDueDate.className = 'todoDueDate';
      todoDueDate.textContent = item.dueDate;

      const todoBtnContainer = document.createElement('div');
      todoBtnContainer.className = 'todoBtnContainer';

      const todoModifyBtn = document.createElement('button');
      todoModifyBtn.className = 'todoModifyBtn';
      todoModifyBtn.textContent = '수정하기';

      const todoToggleBtn = document.createElement('button');
      todoToggleBtn.className = 'todoToggleBtn';
      todoToggleBtn.textContent = item.completed ? '미완료처리' : '완료처리';

      const todoDeleteBtn = document.createElement('button');
      todoDeleteBtn.classList = 'todoDeleteBtn';
      todoDeleteBtn.textContent = '삭제하기';

      todoBtnContainer.appendChild(todoModifyBtn);
      todoBtnContainer.appendChild(todoToggleBtn);
      todoBtnContainer.appendChild(todoDeleteBtn);

      listItem.appendChild(todoId);
      listItem.appendChild(todoTitle);
      listItem.appendChild(todoDesc);
      listItem.appendChild(todoCompleted);
      listItem.appendChild(todoPriority);
      listItem.appendChild(todoDueDate);
      listItem.appendChild(todoBtnContainer);
      todoList.appendChild(listItem);
    });
  }
}

async function Add(todo) {
  const res = await fetch(`${window.APP_CONFIG.API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(todo),
  });

  const { success, message, data } = await res.json();

  if (!success) {
    throw new Error(message);
  }

  return { status: success, message, data };
}

async function Delete(id) {
  const res = await fetch(`${window.APP_CONFIG.API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const { success, message } = await res.json();

  if (!success) {
    throw new Error(message);
  }

  return { status: success, message };
}

async function Toggle(id) {
  const res = await fetch(
    `${window.APP_CONFIG.API_BASE_URL}/todos/${id}/toggle`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );

  const { success, message, data } = await res.json();

  if (!success) {
    throw new Error(message);
  }

  return { status: success, message, data };
}

function Reset() {
  const todoTitle = document.getElementById('newTodoTitle');
  const todoDesc = document.getElementById('newTodoDesc');
  const todoPriority = document.getElementById('newTodoPriority');
  const todoDueDate = document.getElementById('newTodoDuewDate');

  todoTitle.value = '';
  todoDesc.value = '';
  todoPriority.value = 'HIGH';
  todoDueDate.value = '';
}

function InitModify(title, desc, priority, dueDate) {
  const todoTitle = document.getElementById('newTodoTitle');
  const todoDesc = document.getElementById('newTodoDesc');
  const todoPriority = document.getElementById('newTodoPriority');
  const todoDueDate = document.getElementById('newTodoDueDate');

  todoTitle.value = title;
  todoDesc.value = desc;
  todoPriority.value = priority;
  todoDueDate.value = dueDate;
}

async function Modify(todo) {
  const res = await fetch(
    `${window.APP_CONFIG.API_BASE_URL}/todos/${modifyId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(todo),
    },
  );

  const { success, message, data } = await res.json();

  if (!success) {
    throw new Error(message);
  }

  return { status: success, message, data };
}

function SetModifyId(id) {
  modifyId = id;
}

export default {
  Load,
  Build,
  Add,
  Delete,
  Toggle,
  Reset,
  InitModify,
  Modify,
  SetModifyId,
};

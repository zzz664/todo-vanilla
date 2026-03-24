import { ChangeContent } from './scripts/ChangeContent.js';
import { CheckLoginInfo } from './scripts/CheckLoginInfo.js';
import { CheckRegisterInfo } from './scripts/CheckRegisterInfo.js';
import { Login } from './scripts/login.js';
import { Register } from './scripts/register.js';
import Modal from './scripts/Modal.js';
import { UpdateHome } from './scripts/UpdateHome.js';
import { CheckTodo } from './scripts/CheckTodo.js';
import TodoList from './scripts/TodoList.js';

let modifyMode = false;

document.addEventListener('DOMContentLoaded', async () => {
  await UpdateHome();
});

document.addEventListener('click', async (e) => {
  const id = e.target.id;

  if (id === 'loginPageBtn' || id === 'registerPageBtn') {
    ChangeContent(e.target.id);
  }

  if (id === 'logoutBtn') {
    localStorage.removeItem('token');
    await UpdateHome();
  }

  if (e.target.className === 'todoModifyBtn') {
    modifyMode = true;
    document.getElementById('modifyBtnContainer').classList.remove('hidden');
    document.getElementById('submitTodoBtn').disabled = true;

    const todoItem = e.target.closest('li');
    let title = todoItem.querySelector('.todoTitle').textContent;
    let desc = todoItem.querySelector('.todoDesc').textContent;
    let priority = todoItem.querySelector('.todoPriority').textContent;
    priority =
      priority === '높음' ? 'HIGH' : priority === '중간' ? 'MEDIUM' : 'LOW';
    let dueDate = todoItem.querySelector('.todoDueDate').textContent;
    dueDate = new Date(dueDate).toISOString().substring(0, 10);
    const todoId = todoItem.querySelector('.todoId').value;
    TodoList.SetModifyId(todoId);

    TodoList.InitModify(title, desc, priority, dueDate);
  }

  if (id === 'applyModifyBtn') {
  }

  if (id === 'cancelModifyBtn') {
    modifyMode = false;
    document.getElementById('modifyBtnContainer').classList.add('hidden');
    document.getElementById('submitTodoBtn').disabled = false;
    TodoList.Reset();
  }

  if (e.target.className === 'todoToggleBtn') {
    const todoItem = e.target.closest('li');
    const todoId = todoItem.querySelector('.todoId').value;
    const currentCompleted =
      todoItem.querySelector('.todoCompleted').textContent === '완료'
        ? true
        : false;
    try {
      Modal.setTitle('Todo List');
      await TodoList.Toggle(todoId);
      Modal.setContent(
        `할 일을 ${currentCompleted ? '미완료' : '완료'}처리 했습니다.`,
      );
      Modal.show();
      location.reload();
    } catch (error) {
      Modal.setContent(error.message);
      Modal.show();
      return;
    }
  }

  if (e.target.className === 'todoDeleteBtn') {
    const todoItem = e.target.closest('li');
    const todoId = todoItem.querySelector('.todoId').value;

    try {
      Modal.setTitle('Todo List');
      await TodoList.Delete(todoId);
      Modal.setContent('할 일 삭제를 완료했습니다.');
      Modal.show();
      location.reload();
    } catch (error) {
      Modal.setContent(error.message);
      Modal.show();
      return;
    }
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
          location.reload();
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
      case 'todoForm':
        Modal.setTitle('Todo List');
        const todoTitle = document.getElementById('newTodoTitle').value;
        const todoDesc = document.getElementById('newTodoDesc').value;
        const todoPriority = document.getElementById('newTodoPriority').value;
        const todoDueDate = document.getElementById('newTodoDueDate').value;
        const todoData = {
          title: todoTitle,
          description: todoDesc,
          priority: todoPriority,
          dueDate: todoDueDate,
        };
        console.log(todoData);
        const todoValidation = CheckTodo(todoData);

        if (!todoValidation.status) {
          Modal.setContent(todoValidation.message);
          Modal.show();
          break;
        }

        try {
          let result;
          if (modifyMode) {
            result = await TodoList.Modify(todoData);
            TodoList.SetModifyId(null);
            Modal.setContent('할 일 수정을 성공했습니다.');
          } else {
            result = await TodoList.Add(todoData);
            Modal.setContent('할 일 추가를 성공했습니다.');
          }
          Modal.show();
          location.reload();
          break;
        } catch (error) {
          Modal.setContent(error.message);
          Modal.show();
          break;
        }
    }
  }
});

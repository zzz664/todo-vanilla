import { TODO_ITEM_TEMPLATE } from './Constants.js';

export class TodoItem {
  #id = '';
  #title = '';
  #description = '';
  #completed = false;
  #priority = '';
  #dueDate = '';
  #completedAt = '';
  #createdAt = '';
  #updatedAt = '';
  #element = null;
  #titleNode = null;
  #descriptionNode = null;
  #completedNode = null;
  #priorityNode = null;
  #dueDateNode = null;

  constructor({
    id,
    title = '',
    description = '',
    completed = false,
    priority = '',
    dueDate = '',
    completedAt = '',
    createdAt = '',
    updatedAt = '',
  }) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#completed = completed;
    this.#priority = priority;
    this.#dueDate = dueDate;
    this.#completedAt = completedAt;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#element = this.#buildElement();
  }

  #buildElement() {
    const li = document.createElement('li');
    li.className = 'todoItem';
    li.dataset.id = this.#id;

    li.innerHTML = TODO_ITEM_TEMPLATE;

    this.#titleNode = li.querySelector('.todoTitle');
    this.#descriptionNode = li.querySelector('.todoDesc');
    this.#completedNode = li.querySelector('.todoCompleted');
    this.#priorityNode = li.querySelector('.todoPriority');
    this.#dueDateNode = li.querySelector('.todoDueDate');

    this.#syncDOM();

    return li;
  }

  get() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      completed: this.#completed,
      priority: this.#priority,
      dueDate: this.#dueDate,
      completedAt: this.#completedAt,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }

  getElement() {
    return this.#element;
  }

  set({
    title = this.#title,
    description = this.#description,
    completed = this.#completed,
    priority = this.#priority,
    dueDate = this.#dueDate,
    completedAt = this.#completedAt,
    createdAt = this.#createdAt,
    updatedAt = this.#updatedAt,
  } = {}) {
    this.#title = title;
    this.#description = description;
    this.#completed = completed;
    this.#priority = priority;
    this.#dueDate = dueDate;
    this.#completedAt = completedAt;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#syncDOM();
  }

  #syncDOM() {
    this.#titleNode.textContent = this.#title;
    this.#descriptionNode.textContent = this.#description;
    this.#priorityNode.textContent = this.#priority;
    this.#dueDateNode.textContent = this.#dueDate;
    this.#completedNode.textContent = this.#completed ? '완료' : '미완료';
  }

  setTitle(title) {
    this.#title = title;
    this.#titleNode.textContent = this.#title;
  }

  setDescription(description) {
    this.#description = description;
    this.#descriptionNode.textContent = this.#description;
  }

  setPriority(priority) {
    this.#priority = priority;
    this.#priorityNode.textContent = this.#priority;
  }

  setDueDate(dueDate) {
    this.#dueDate = dueDate;
    this.#dueDateNode.textContent = this.#dueDate;
  }

  setCompleted(completed) {
    this.#completed = completed;
    this.#completedNode.textContent = this.#completed ? '완료' : '미완료';
  }

  setCompletedAt(completedAt) {
    this.#completedAt = completedAt;
  }
  setCreatedAt(createdAt) {
    this.#createdAt = createdAt;
  }
  setUpdatedAt(updatedAt) {
    this.#updatedAt = updatedAt;
  }
}

const modal = document.getElementById('modal');

function setTitle(title) {
  const modalTitle = modal.querySelector('.modalTitle');
  modalTitle.textContent = title;
}

function setContent(content) {
  const modalContent = modal.querySelector('.modalContent');
  modalContent.textContent = content;
}

function show() {
  modal.classList.remove('hidden');
}

function close() {
  modal.classList.add('hidden');
}

export default { setTitle, setContent, show, close };

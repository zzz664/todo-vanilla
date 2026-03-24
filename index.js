import { ChangeContentByButton } from './scripts/ChangeContent.js';

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    ChangeContentByButton(e.target.id);
  }
});

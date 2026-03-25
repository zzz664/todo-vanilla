export const TODO_ITEM_TEMPLATE = `
    <div class='todoBadgeContainer'>
      <span class='todoCompleted badge'></span>
      <span class='todoPriority badge'></span>
    </div>
    <i class="fa-solid fa-splotch marker"></i>
    <details class='todoContent'>
      <summary class='todoTitle'></summary>
      <p class='todoDesc'></p>
    </details>
    <button type="button" class="todoDeleteBtn"><i class="fa-solid fa-x"></i></button>
    <span class='todoDueDate'></span>
    `;
export const API_BASE_URL = 'https://api.fullstackfamily.com/api/edu/ws-dbd822';
export const ID_REG = /^[A-Za-z0-9]{4,20}$/;
export const PW_REG =
  /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{4,20}$/;
export const NICK_REG = /^[가-힣A-Za-z0-9]{2,20}$/;

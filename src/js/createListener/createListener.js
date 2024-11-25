import './listener.css';

export default function createListener(usersContainer, userName) {
  const markup = `
        <div class="listener-container">
            <img class="avatar" src="https://svgsilh.com/svg/1299805-9e9e9e.svg">
            <div class="listener-name">${userName}</div>
        </div>
    `;

  usersContainer.insertAdjacentHTML('beforeend', markup);
}

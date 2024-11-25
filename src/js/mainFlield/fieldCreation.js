import './field.css';

export default function fieldCreation() {
  const markup = `
        <div class="container-main hidden" name="">
            <div class="chat">
            </div>
            <form class="chat-form">
                <input class="message-input" placeholder="Новое сообщение...">
            </form>
            <div class="listeners">
            </div>
        </div>
        <div class="form-widget">
            <div class="form-container">
                <span class="title">Введите имя пользователя</span>
                <form class="login-form">
                    <input class="name" type="text" required>
                    <button class="create" type="submit">Подтвердить</button>
                </form>
            </div>
        </div>
        <button class="exit">Покинуть чат</button>
    `;
  document.body.insertAdjacentHTML('afterbegin', markup);
}

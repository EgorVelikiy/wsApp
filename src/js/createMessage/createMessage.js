import './message.css';

export default function createMessages(chat, data) {
  const markup = `
        <div class="message-container">
            <div class="message-widget">
                <div class="user-name">${data.name},</div>
                <div class="date-sended">${data.sended}</div>
            </div>
            <div class="message">${data.message}</div>
        </div>
    `;
  chat.insertAdjacentHTML('beforeend', markup);
}

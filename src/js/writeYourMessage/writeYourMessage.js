import './selfmessage.css';

export default function writeYourMessage(chat, data) {
  const markup = `
        <div class="self-message-container">
            <div class="message-widget">
                <div class="user-name">You,</div>
                <div class="date-sended">${data.sended}</div>
            </div>
            <div class="message">${data.message}</div>
        </div>
    `;
  chat.insertAdjacentHTML('beforeend', markup);
}

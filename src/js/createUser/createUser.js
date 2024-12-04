import createListener from '../createListener/createListener';
import createMessages from '../createMessage/createMessage';
import writeYourMessage from '../writeYourMessage/writeYourMessage';

export default class createUser {
  constructor(formContainer, chatContainer, startChatBtn, exitBtn) {
    this.formContainer = formContainer;
    this.chatContainer = chatContainer;
    this.exitBtn = exitBtn;
    this.listeners = this.chatContainer.querySelector('.listeners');
    this.chat = this.chatContainer.querySelector('.chat');
    this.startChatBtn = startChatBtn;
    this.chatForm = this.chatContainer.querySelector('.chat-form');
    this.loginForm = this.formContainer.querySelector('.login-form');
    this.userName;
    this.ws;
  }

  init() {
    this.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = this.loginForm.querySelector('.name').value;
      this.addUser(name);
    });

    this.startChatBtn.addEventListener('click', () => {
      this.startChating();
    });

    this.chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = this.chatForm.querySelector('.message-input').value;
      const userName = this.chatContainer.getAttribute('name');
      if (!message) return;
      this.sendMessage(message, userName);
    });

    this.exitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.exitChat();
    });

    window.addEventListener('beforeunload', () => {
      this.exitChat();
    });
  }

  addUser(userName) {
    this.userName = userName;
    this.loginForm.reset();
    this.formContainer.classList.add('hidden');
    this.chatContainer.setAttribute('name', userName);
    this.startChatBtn.classList.remove('hidden');
  }

  startChating() {
    this.ws = new WebSocket('ws://wsserver-168s.onrender.com');
    this.chatContainer.classList.remove('hidden');
    this.exitBtn.classList.remove('hidden');
    this.ws.onopen = () => this.ws.send(JSON.stringify({ userReg: this.userName }));

    this.ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      if (data.messages) {
        Array.from(data.messages).forEach((message) => createMessages(this.chat, message));
      } else if (data.users) {
        console.log('data.users');
        this.listeners.replaceChildren();
        Array.from(data.users).forEach((user) => createListener(this.listeners, user.name));
      } else if (data.newUser) {
        console.log('data.newUser');
        createListener(this.listeners, data.newUser);
      } else if (data.name == this.chatContainer.getAttribute('name')) {
        writeYourMessage(this.chat, data);
      } else {
        createMessages(this.chat, data);
      }
    });
  }

  sendMessage(message, userName) {
    const newMessage = { userName: userName, msg: message };
    this.ws.send(JSON.stringify(newMessage));
    this.chatForm.querySelector('.message-input').value = '';
  }

  exitChat() {
    const wsName = this.chatContainer.getAttribute('name');
    this.ws.send(JSON.stringify({ closeName: wsName }));

    this.ws.close();
    console.log('ws closing');
    this.ws.onclose = () => {
      window.location.reload();
    };
  }
}

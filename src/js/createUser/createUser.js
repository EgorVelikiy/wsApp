import fieldCreation from '../mainFlield/fieldCreation';
import createListener from '../createListener/createListener';
import createMessages from '../createMessage/createMessage';
import writeYourMessage from '../writeYourMessage/writeYourMessage';

export default class createUser {
  constructor(formContainer, chatContainer, exitBtn, usersContainer, chat) {
    this.formContainer = formContainer;
    this.chatContainer = chatContainer;
    this.exitBtn = exitBtn;
    this.usersContainer = usersContainer;
    this.chat = chat;
    this.ws = new WebSocket('ws://localhost:7070');
    console.log(this.ws);
    this.chatForm = this.chatContainer.querySelector('.chat-form');
    this.loginForm = this.formContainer.querySelector('.login-form');
    this.apiUrl = 'http://localhost:7070';
  }

  init() {
    this.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = this.loginForm.querySelector('.name').value;
      this.addUser(name);
    });

    this.chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = this.chatForm.querySelector('.message-input').value;
      const userName = this.chatContainer.getAttribute('name');
      if (!message) return;
      this.sendMessage(message, userName);
    });

    this.exitBtn.addEventListener('click', () => {
      this.exitChat();
    });

    this.ws.addEventListener('error', (e) => {
      console.log(e);
      console.log('ws error');
    });

    this.ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      if (data.messages) {
        Array.from(data.messages).forEach((message) => createMessages(this.chat, message));
      } else if (data.users) {
        this.usersContainer.replaceChildren();
        Array.from(data.users).forEach((user) => createListener(this.usersContainer, user.name));
      } else if (data.newUser) {
        createListener(this.usersContainer, data.newUser);
      } else if (data.name == this.chatContainer.getAttribute('name')) {
        writeYourMessage(this.chat, data);
      } else {
        createMessages(this.chat, data);
      }
    });
  }

  async addUser(userName) {
    try {
      const request = fetch(this.apiUrl + '/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: `${userName}` }),
      });

      const result = await request;

      if (!result.ok) {
        const json = await result.json();
        alert(json.error);
        return;
      }

      this.loginForm.reset();
      this.formContainer.classList.add('hidden');
      document.querySelector('.container-main').setAttribute('name', userName);
      document.querySelector('.container-main').classList.remove('hidden');
      this.ws.send(JSON.stringify({ userReg: userName }));
    } catch (e) {
      console.log(e);
    }
  }

  sendMessage(message, userName) {
    const newMessage = { userName: userName, msg: message };
    this.ws.send(JSON.stringify(newMessage));
    this.chatForm.querySelector('.message-input').value = '';
  }

  exitChat() {
    const wsName = this.chatContainer.getAttribute('name');
    console.log(wsName);
    this.ws.send(JSON.stringify({ closeName: wsName }));

    this.ws.close();
    document.body.replaceChildren();
    fieldCreation();

    this.ws = new WebSocket('ws://localhost:7070');
  }
}

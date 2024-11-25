import fieldCreation from './mainFlield/fieldCreation';
import createUser from './createUser/createUser';

fieldCreation();

const chat = document.querySelector('.chat');
const chatContainer = document.querySelector('.container-main');
const usersContainer = document.querySelector('.listeners');

const formContainer = document.querySelector('.form-widget');
const exitBtn = document.querySelector('.exit');
const userCreator = new createUser(formContainer, chatContainer, exitBtn, usersContainer, chat);
userCreator.init();

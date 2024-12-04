import fieldCreation from './mainFlield/fieldCreation';
import createUser from './createUser/createUser';

fieldCreation();

const formContainer = document.querySelector('.form-widget');
const chatContainer = document.querySelector('.container-main');
const exitBtn = document.querySelector('.exit');
const startChatBtn = document.querySelector('.start');

const userCreator = new createUser(formContainer, chatContainer, startChatBtn, exitBtn);
userCreator.init();

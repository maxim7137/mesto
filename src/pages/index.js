// import './index.css';

import {
  selectors,
  validationObject,
  initialCards,
  profileForm,
  cardForm,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
  formElementCard,
  nameCard,
  linkCard,
  profileButtonElement,
  cardButtonElement
} from '../utils/constants.js';

import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PicturePopup from '../components/PicturePopup.js';


import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// Попапы

const picturePopup = new PicturePopup(selectors.popupImg); // попап с картинкой
picturePopup.setEventListeners();

const popupWithFormProfile = new PopupWithForm(selectors.popupProfile, _ => {
  const user = new UserInfo({
    userNameSelector: selectors.profileName,
    userJobSelector: selectors.profileCharacter
  });
  user.setUserInfo();
  popupWithFormProfile.close();
}); // попап редактирования профиля
popupWithFormProfile.setEventListeners();

const popupWithFormCard = new PopupWithForm(selectors.popupCard); // попап создания карточки
popupWithFormCard.setEventListeners();

// создание начальных карточек
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, selectors.cardTemplate, picturePopup.handleCardClick);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }
  },
  selectors.cardElements
);
// отрисовка начальных карточек
cardsList.renderItems();

// карточки после отправки формы
function addCardSubmitEventListener() {
  formElementCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitCard = [{
      name: nameCard.value,
      link: linkCard.value
    }];
    const oneCard = new Section({
      items: submitCard,
      renderer: (item) => {
        const card = new Card(item, selectors.cardTemplate, picturePopup.handleCardClick);
        const cardElement = card.generateCard();
        oneCard.prependItem(cardElement);
      }
    }, selectors.cardElements);
    oneCard.renderItems();
    popupWithFormCard.close();
  })
};
addCardSubmitEventListener();

// Создаем для каждой проверяемой формы экземпляр класса FormValidator.
const profileFormValidator = new FormValidator(validationObject, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationObject, cardForm);
cardFormValidator.enableValidation();

// Открываем попап редактирования профиля по клику на кнопку
buttonEdit.addEventListener('click', () => {
  popupWithFormProfile.open(); // Открываем попап
  const user = new UserInfo({
    userNameSelector: selectors.profileName,
    userJobSelector: selectors.profileCharacter
  });
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().info;
  profileFormValidator.enableButtonState(profileButtonElement);
});

// Открываем попап добавления карточки
buttonAdd.addEventListener('click', () => {
  popupWithFormCard.open(); // Открываем попап
  cardFormValidator.disableButtonState(cardButtonElement);
});
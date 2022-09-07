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
  profileButtonElement
} from './constants.js';

import {
  PopupWithImage,
  PopupWithForm
} from './Popup.js'

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

// Попапы

const popupWithImage = new PopupWithImage(selectors.popupImg); // попап с картинкой

const popupWithFormProfile = new PopupWithForm(selectors.popupProfile, _ => {
  const user = new UserInfo({
    userNameSelector: selectors.profileName,
    userJobSelector: selectors.profileCharacter
  });
  user.setUserInfo();
  popupWithFormProfile.close();
}); // попап редактирования профиля

const popupWithFormCard = new PopupWithForm(selectors.popupCard); // попап создания карточки

// создание начальных карточек
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, selectors.cardTemplate, popupWithImage.handleCardClick);
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
        const card = new Card(item, selectors.cardTemplate, popupWithImage.handleCardClick);
        const cardElement = card.generateCard();
        oneCard.addItem(cardElement);
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
});
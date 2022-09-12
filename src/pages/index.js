import './index.css';

import {
  selectors,
  validationObject,
  initialCards,
  profileForm,
  cardForm,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput
} from '../utils/constants.js';

import PopupWithForm from '../components/PopupWithForm.js';
import PicturePopup from '../components/PicturePopup.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// Функция создания карточки
function createCard(item) {
  const card = new Card(item, selectors.cardTemplate, picturePopup.open);
  const cardElement = card.generateCard();
  return cardElement;
}

// Юзер
const user = new UserInfo({
  userNameSelector: selectors.profileName,
  userJobSelector: selectors.profileCharacter
});

// Попапы //
// попап с картинкой
const picturePopup = new PicturePopup(selectors.popupImg);
picturePopup.setEventListeners();
// попап редактирования профиля
const popupWithFormProfile = new PopupWithForm(selectors.popupProfile, _ => {
  user.setUserInfo(nameInput.value, jobInput.value);
  popupWithFormProfile.close();
});
popupWithFormProfile.setEventListeners();
// попап создания карточки
const popupWithFormCard = new PopupWithForm(selectors.popupCard,
  (evt) => {
    evt.preventDefault();
    const submitCard = popupWithFormCard._getInputValues();

    const cardElement = createCard(submitCard);
    cardsList.prependItem(cardElement);

    popupWithFormCard.close();
  });

popupWithFormCard.setEventListeners();

// создание начальных карточек
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    }
  },
  selectors.cardElements
);

// отрисовка карточек
cardsList.renderItems();

// Создаем для каждой проверяемой формы экземпляр класса FormValidator.
const profileFormValidator = new FormValidator(validationObject, profileForm);
const cardFormValidator = new FormValidator(validationObject, cardForm);

// Открываем попап редактирования профиля по клику на кнопку
buttonEdit.addEventListener('click', () => {
  popupWithFormProfile.open(); // Открываем попап
  popupWithFormProfile.setInputValues(user.getUserInfo()); // Заполняем инпуты
  profileFormValidator.enableValidation(); // Запускаем валидацию
  profileFormValidator.publicCheckError(); // Проверяем инпуты при открытии
  profileFormValidator.enableButtonState(); // Включаем кнопку
});

// Открываем попап добавления карточки
buttonAdd.addEventListener('click', () => {
  popupWithFormCard.open(); // Открываем попап
  cardFormValidator.publicHideError(); // Скрываем ошибки при открытии пустой формы
  cardFormValidator.enableValidation(); // Запускаем валидацию
  cardFormValidator.disableButtonState(); // Выключаем кнопку
});
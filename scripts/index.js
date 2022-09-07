import {
  selectors,
  validationObject,
  initialCards,
  root,
  profileForm,
  cardForm,
  buttonEdit,
  buttonAdd,
  popupProfile,
  popupCard,
  popupImg,
  popupImgPicture,
  captionOfPopupImg,
  formElementProfile,
  nameInput,
  jobInput,
  profileName,
  profileCharacter,
  formElementCard,
  nameCard,
  linkCard,
} from './constants.js';

import UserInfo from './UserInfo.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';

// создание начальных карточек
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, selectors.cardTemplate, handleOpenBigImage);

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
        const card = new Card(item, selectors.cardTemplate, handleOpenBigImage);
        const cardElement = card.generateCard();
        oneCard.addItem(cardElement);
      }
    }, selectors.cardElements);
    oneCard.renderItems();
    closePopup(popupCard);
  })
};
addCardSubmitEventListener();

// Создаем для каждой проверяемой формы экземпляр класса FormValidator.
const profileFormValidator = new FormValidator(validationObject, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationObject, cardForm);
cardFormValidator.enableValidation();



// ФУНКЦИИ //
// Функция закрытия попапа по кнопке Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpenedNode = root.querySelector(selectors.popupOpenedClass);
    closePopup(popupOpenedNode);
  }
}

// Открываем попап
function openPopup(popup) {
  popup.classList.add(selectors.popupOpened);
  root.addEventListener('keydown', closePopupByEsc); // слушатель Escape
}

// Закрываем попап
function closePopup(popup) {
  popup.classList.remove(selectors.popupOpened);
  root.removeEventListener('keydown', closePopupByEsc); // удаляем слушатель Escape
}

// Функция закрытия попапа по клику
function closePopupByClick(evt) {
  const target = evt.target;
  const modal = target.closest(selectors.popup);
  if (target.classList.contains(selectors.cross) || target.classList.contains(selectors.crossImg) || target === modal) {
    closePopup(modal);
  }
}

// Функция вставки значений из полей в профиль
function insertValuesFromPopupFieldsToProfile() {
  profileName.textContent = nameInput.value;
  profileCharacter.textContent = jobInput.value;
}

// Функция вставки значений из документа в поле редактирования профиля
function insertValuesFromProfileToPopupFields() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCharacter.textContent;
}

// Функция очистки полей добавления карточки и ошибок
function clearCardFormInputsAndErrors() {
  const buttonElement = formElementCard.querySelector(selectors.submitButtonSelector);
  const inputList = Array.from(formElementCard.querySelectorAll(selectors.inputSelector));
  inputList.forEach((inputElement) => {
    const errorElement = formElementCard.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
    inputElement.value = '';
  });
  cardFormValidator.disableButtonState(buttonElement);
}

// Функция очистки ошибок при открытии попапа профиля
function clearProfileFormErrors() {
  const buttonElement = formElementProfile.querySelector(selectors.submitButtonSelector);
  const inputList = Array.from(formElementProfile.querySelectorAll(selectors.inputSelector));
  inputList.forEach((inputElement) => {
    const errorElement = formElementProfile.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
  });
  profileFormValidator.enableButtonState(buttonElement);
}

// Функция «отправки» формы, профиля
function submitProfileForm() {
  insertValuesFromPopupFieldsToProfile(); // Вставляем новые значения из полей в документ с помощью textContent
  closePopup(popupProfile); // Закрываем попап
}

// СЛУШАТЕЛИ СОБЫТИЙ //

// обработчики кликов для закрытия каждого попапа
function addCloseListenerToAllPopups() {
  const popupList = Array.from(root.querySelectorAll(selectors.popup));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', closePopupByClick);
  });
};
addCloseListenerToAllPopups();

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', submitProfileForm); // форма профиля

// Открываем попап редактирования профиля по клику на кнопку
buttonEdit.addEventListener('click', () => {
  openPopup(popupProfile); // Открываем попап
  insertValuesFromProfileToPopupFields(); // Вставляем значения из документа в поля формы с помощью textContent
  clearProfileFormErrors();
});

// Открываем попап добавления карточки
buttonAdd.addEventListener('click', () => {
  clearCardFormInputsAndErrors();
  openPopup(popupCard); // Открываем попап
});

// Открываем попап картинки
function handleOpenBigImage(link, name) {
  popupImgPicture.src = link;
  popupImgPicture.alt = name;
  captionOfPopupImg.textContent = name;
  openPopup(popupImg);
}
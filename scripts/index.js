import Card from './Card.js';
import FormValidator from './FormValidator.js';
// Данные карточек из коробки
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Селекторы
const selectors = {
  cardTemplate: '#card-template',
  page: '.page',
  cardElements: '.elements',
  editButton: '.profile__edit-button',
  addButton: '.profile__add-button',
  popupProfile: '.popup_profile',
  popupCard: '.popup_card',
  formElement: '.popup__container',
  formProfile: '.popup__form_profile',
  formCard: '.popup__form_card',
  formCardNameError: '.card-name-input-error',
  formCardLinkError: '.card-address-input-error',
  nameInput: '.popup__input_user_name',
  jobInput: '.popup__input_user_character',
  profileName: '.profile__name',
  profileCharacter: '.profile__character',
  formElementCard: '.popup__container',
  nameCard: '.popup__input_card_name',
  linkCard: '.popup__input_card_address',
  popup: '.popup',
  popupOpened: 'popup_opened',
  popupOpenedClass: '.popup_opened',
  cross: 'cross',
  crossImg: 'cross__img',
  elementsImageClass: 'elements__image',
  elementsTrashClass: 'elements__trash',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const root = document.querySelector(selectors.page);

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const profileForm = root.querySelector(selectors.formProfile);
const cardForm = root.querySelector(selectors.formCard);

// Шаблон карточки
const cardElements = root.querySelector(selectors.cardElements);

// Находим кнопки
const buttonEdit = root.querySelector(selectors.editButton); // кнопка редактирования профиля
const buttonAdd = root.querySelector(selectors.addButton); // кнопка добавления карточки

// Находим попапы
const popupProfile = root.querySelector(selectors.popupProfile); // попап редактирования профиля
const popupCard = root.querySelector(selectors.popupCard); // попап добавления карточки

// /-- Форма редактирования профиля
const formElementProfile = popupProfile.querySelector(selectors.formProfile);

// Находим поля формы
const nameInput = formElementProfile.querySelector(selectors.nameInput);
const jobInput = formElementProfile.querySelector(selectors.jobInput);

// Находим элементы, откуда должны быть вставлены значения полей
const profileName = root.querySelector(selectors.profileName);
const profileCharacter = root.querySelector(selectors.profileCharacter);
// Форма редактирования профиля --/

// /-- Форма добавления карточки
const formElementCard = popupCard.querySelector(selectors.formCard);
// Находим поля формы добавления карточки
const nameCard = formElementCard.querySelector(selectors.nameCard);
const linkCard = formElementCard.querySelector(selectors.linkCard);
// Форма добавления карточки --/

// Создаем начальные карточки
initialCards.forEach((item) => {
  const card = new Card(item, selectors.cardTemplate, openPopup);
  const cardElement = card.generateCard();

  cardElements.append(cardElement);
});

// Создаем для каждой проверяемой формы экземпляр класса FormValidator.
const profileFormValidator = new FormValidator(validationObject, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationObject, cardForm);
cardFormValidator.enableValidation();

// Функция-обработчик события отправки формы карточки
function addCardSubmitEventListener() {
  formElementCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const item = {
      name: nameCard.value,
      link: linkCard.value
    };
    const card = new Card(item, selectors.cardTemplate, openPopup);
    const cardElement = card.generateCard();

    cardElements.prepend(cardElement);

    closePopup(popupCard);
  })
};
addCardSubmitEventListener();

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
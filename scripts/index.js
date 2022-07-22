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

const selectors = {
  cardTemplate: '#card-template',
  page: '.page',
  cardElements: '.elements',
  cardElement: '.elements__element',
  elementsImage: '.elements__image',
  elementsName: '.elements__name',
  editButton: '.profile__edit-button',
  saveButton: '.popup__submit-button',
  addButton: '.profile__add-button',
  saveButtonCard: '.popup__submit-button',
  popupProfile: '.popup_profile',
  popupCard: '.popup_card',
  popupImg: '.popup_image',
  formElement: '.popup__container',
  nameInput: '.popup__text_user_name',
  jobInput: '.popup__text_user_character',
  profileName: '.profile__name',
  profileCharacter: '.profile__character',
  formElementCard: '.popup__container',
  nameCard: '.popup__text_card_name',
  linkCard: '.popup__text_card_address',
  popup: '.popup',
  popupImage: '.popup__img',
  popupCaption: '.popup__caption',
  liked: 'elements__like-button_liked',
  likeButton: 'elements__like-button',
  popupOpened: 'popup_opened',
  cross: 'cross',
  crossImg: 'cross__img',
  elementsImageClass: 'elements__image',
  elementsTrashClass: 'elements__trash',

}

const root = document.querySelector(selectors.page);

// Шаблон карточки
const cardTemplate = root.querySelector(selectors.cardTemplate).content;
const cardElements = root.querySelector(selectors.cardElements);

// Карточки из коробки
for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.querySelector(selectors.cardElement).cloneNode(true);
  cardElement.querySelector(selectors.elementsImage).src = initialCards[i].link;
  cardElement.querySelector(selectors.elementsImage).alt = initialCards[i].name;
  cardElement.querySelector(selectors.elementsName).textContent = initialCards[i].name;
  cardElements.append(cardElement);
}
// Карточки из коробки

// Находим кнопки
const editButton = root.querySelector(selectors.editButton); // кнопка редактирования профиля
const saveButton = root.querySelectorAll(selectors.saveButton)[0]; // кнопка сохранения профиля
const addButton = root.querySelector(selectors.addButton); // кнопка добавления карточки
const saveButtonCard = root.querySelectorAll(selectors.saveButtonCard)[1]; // кнопка сохранения карточки

// Находим попапы
const popupProfile = root.querySelector(selectors.popupProfile); // попап редактирования профиля
const popupCard = root.querySelector(selectors.popupCard); // попап добавления карточки
const popupImg = root.querySelector(selectors.popupImg); // попап картинки

// Находим форму редактирования профиля
const formElement = root.querySelectorAll(selectors.formElement)[0];

// Находим поля формы
const nameInput = formElement.querySelector(selectors.nameInput);
const jobInput = formElement.querySelector(selectors.jobInput);

// Находим элементы, откуда должны быть вставлены значения полей
const profileName = root.querySelector(selectors.profileName);
const profileCharacter = root.querySelector(selectors.profileCharacter);
// Форма редактирования профиля

// Находим форму добавления карточки
const formElementCard = root.querySelectorAll(selectors.formElementCard)[1];
// Находим поля формы добавления карточки
const nameCard = formElementCard.querySelector(selectors.nameCard);
const linkCard = formElementCard.querySelector(selectors.linkCard);
// Форма добавления карточки

// ФУНКЦИИ //

// Лайк
function toLike(h) {
  h.classList.toggle(selectors.liked);
}

// Функция лайка любого лайка
function toLikeAll(evt) {
  const target = evt.target;
  if (target.classList.contains(selectors.likeButton)) {
    toLike(target);
  }
}

// Открываем попап
function popupOpen(p) {
  p.classList.add(selectors.popupOpened);
}

// Закрываем попап
function popupClose(p) {
  p.classList.remove(selectors.popupOpened);
}

// Функция закрытия попапа для всех кнопок закрытия
function closePopup(evt) {
  const target = evt.target;
  const modal = target.closest(selectors.popup);
  if (target.classList.contains(selectors.cross) || target.classList.contains(selectors.crossImg) || target === modal) {
    popupClose(modal);
  }
}

// Функция вставки значений из полей в документ
function insertValuesFromField() {
  profileName.textContent = nameInput.value;
  profileCharacter.textContent = jobInput.value;
}

// Функция вставки значений из документа в поле
function insertValuesToField() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCharacter.textContent;
}

// Функция «отправки» формы, профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  insertValuesFromField(); // Вставляем новые значения из полей в документ с помощью textContent
  popupClose(popupProfile);
}

// Функция «отправки» формы, карточки
function formSubmitHandlerCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const cardElement = cardTemplate.querySelector(selectors.cardElement).cloneNode(true);
  cardElement.querySelector(selectors.elementsImage).src = linkCard.value;
  cardElement.querySelector(selectors.elementsImage).alt = nameCard.value;
  cardElement.querySelector(selectors.elementsName).textContent = nameCard.value;
  cardElements.prepend(cardElement);
  popupClose(popupCard);
}

// Функция открытия попапа с картинкой
function toOpenImage(evt) {
  const target = evt.target;
  if (target.classList.contains(selectors.elementsImageClass)) {
    popupImg.querySelector(selectors.popupImage).src = target.src;
    popupImg.querySelector(selectors.popupCaption).textContent = target.alt;
    popupOpen(popupImg);
  }
}

// Функция удаления карточки
function toDel(t) {
  const cardItem = t.closest(selectors.cardElement);
  cardItem.remove();
}

// Функция удаления любой карточки
function toDelCard(evt) {
  const target = evt.target;
  if (target.classList.contains(selectors.elementsTrashClass)) {
    toDel(target);
  }
}

// СЛУШАТЕЛИ СОБЫТИЙ //

// обработчик кликов для закрытия любых попапов
root.addEventListener('click', closePopup);

// обработчик кликов для лайков
root.addEventListener('click', toLikeAll);

// обработчик удаления карточек
root.addEventListener('click', toDelCard);

// обработчик попапа картинки
cardElements.addEventListener('click', toOpenImage);

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); // форма профиля
formElementCard.addEventListener('submit', formSubmitHandlerCard); // форма карточки

// Открываем попап редактирования профиля по клику на кнопку
editButton.addEventListener('click', () => {
  insertValuesToField(); // Вставляем значения из документа в поля формы с помощью textContent
  popupOpen(popupProfile);
});

// Открываем попап добавления карточки
addButton.addEventListener('click', () => {
  popupOpen(popupCard);
});
// КОНСТАНТЫ //
const root = document.querySelector('.page');
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

// Шаблон карточки
const cardTemplate = root.querySelector('#card-template').content;
const cardElements = root.querySelector('.elements');

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__image').src = initialCards[i].link;
  cardElement.querySelector('.elements__name').textContent = initialCards[i].name;
  cardElements.append(cardElement);
}

// Находим кнопки
const editButton = root.querySelector('.profile__edit-button');
const saveButton = root.querySelectorAll('.popup__submit-button')[0];
const addButton = root.querySelector('.profile__add-button');
const saveButtonCard = root.querySelectorAll('.popup__submit-button')[1];

// Находим попапы
const popupProfile = root.querySelector('.popup-profile'); // попап редактирования профиля
const popupCard = root.querySelector('.popup-card'); // попап добавления карточки

// ПЕРЕМЕННЫЕ //

// Находим форму
let formElement = root.querySelectorAll('.popup__container')[0];
let formElementCard = root.querySelectorAll('.popup__container')[1];

// Находим поля формы
let nameInput = formElement.querySelector('.popup__text_user_name');
let jobInput = formElement.querySelector('.popup__text_user_character');

// Находим элементы, откуда должны быть вставлены значения полей
let profileName = root.querySelector('.profile__name');
let profileCharacter = root.querySelector('.profile__character');

// ФУНКЦИИ //

// Лайк
function toLike(h) {
  h.classList.toggle('elements__like-button_liked');
}

// Функция лайка любого лайка
function toLikeAll(evt) {
  const target = evt.target;
  if (target.classList.contains('elements__like-button')) {
    toLike(target);
  }
}

// Открываем попап
function popupOpen(p) {
  p.classList.add('popup_opened');
}

// Закрываем попап
function popupClose(p) {
  p.classList.remove('popup_opened');
}

// Функция закрытия попапа для всех кнопок закрытия
function closePopup(evt) {
  const target = evt.target;
  const modal = target.closest('.popup');
  if (target.classList.contains('popup_close') || target === modal) {
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


// Обработчик «отправки» формы, профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  insertValuesFromField(); // Вставляем новые значения из полей в документ с помощью textContent
  popupClose(popupProfile);
}

// Обработчик «отправки» формы, карточки
function formSubmitHandlerCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  popupClose(popupCard);
}

// СЛУШАТЕЛИ СОБЫТИЙ //
// обработчик кликов для закрытия любых попапов
root.addEventListener('click', closePopup);

// обработчик кликов для лайков
root.addEventListener('click', toLikeAll);

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
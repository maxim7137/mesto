// КОНСТАНТЫ //

// Находим кнопки
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button')[0];
const saveButton = document.querySelectorAll('.popup__submit-button')[0];

const addButton = document.querySelector('.profile__add-button');
const closeButtonCard = document.querySelectorAll('.popup__close-button')[1];
const saveButtonCard = document.querySelectorAll('.popup__submit-button')[1];

// Находим попапы
const popupProfile = document.querySelector('.popup-profile'); // попап редактирования профиля
const popupCard = document.querySelector('.popup-card'); // попап добавления карточки

// ПЕРЕМЕННЫЕ //

// Находим форму
let formElement = document.querySelectorAll('.popup__container')[0];
let formElementCard = document.querySelectorAll('.popup__container')[1];

// Находим поля формы
let nameInput = formElement.querySelector('.popup__text_user_name');
let jobInput = formElement.querySelector('.popup__text_user_character');

// Находим элементы, откуда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileCharacter = document.querySelector('.profile__character');

// ФУНКЦИИ //

// Открываем попап
function popupOpen(p) {
  p.classList.add('popup_opened');
}

// Закрываем попап
function popupClose(p) {
  p.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Вставляем новые значения из полей в документ с помощью textContent
  profileName.textContent = nameInput.value;
  profileCharacter.textContent = jobInput.value;
  popupClose(popupProfile);
}

// Обработчик «отправки» формы, карточки
function formSubmitHandlerCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  popupClose(popupCard);
}

// СЛУШАТЕЛИ СОБЫТИЙ //

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', formSubmitHandlerCard);

// Открываем попап редактирования профиля по клику на кнопку
editButton.addEventListener('click', () => {
  // Вставляем значения из документа в поля формы с помощью textContent
  nameInput.value = profileName.textContent;
  jobInput.value = profileCharacter.textContent;
  popupOpen(popupProfile);
});

// Закрываем попап редактирования профиля по клику на кнопку
closeButton.addEventListener('click', () => {
  popupClose(popupProfile);
});

// Открываем попап добавления карточки
addButton.addEventListener('click', () => {
  popupOpen(popupCard);
});

// Закрываем попап редактирования профиля по клику на кнопку
closeButtonCard.addEventListener('click', () => {
  popupClose(popupCard);
});
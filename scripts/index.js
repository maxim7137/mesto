// КОНСТАНТЫ //

// Находим кнопки
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__submit-button');
const popup = document.querySelector('.popup');

// ПЕРЕМЕННЫЕ //

// Находим форму
let formElement = document.querySelector('.popup__container');

// Находим поля формы
let nameInput = formElement.querySelector('.popup__text_user_name');
let jobInput = formElement.querySelector('.popup__text_user_character');

// Находим элементы, откуда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileCharacter = document.querySelector('.profile__character');

// ФУНКЦИИ //

// Открываем попап
function popupOpen() {
  // Вставляем значения из документа в поля формы с помощью textContent
  nameInput.value = profileName.textContent;
  jobInput.value = profileCharacter.textContent;
  popup.classList.add('popup_opened');
}

// Закрываем попап
function popupClose() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Вставляем новые значения из полей в документ с помощью textContent
  profileName.textContent = nameInput.value;
  profileCharacter.textContent = jobInput.value;
  popupClose();
}

// СЛУШАТЕЛИ СОБЫТИЙ //

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// Открываем попап редактирования профиля по клику на кнопку
editButton.addEventListener('click', popupOpen);
// Закрываем попап редактирования профиля по клику на кнопку
closeButton.addEventListener('click', popupClose);
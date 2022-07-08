const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__submit-button');
const popup = document.querySelector('.popup');

function popupOpen(evt) {
  // Выберите элементы, откуда должны быть вставлены значения полей
  let profileName = document.querySelector('.profile__name');
  let profileCharacter = document.querySelector('.profile__character');

  // Находим форму в DOM
  let formElement = document.querySelector('.popup__container');
  // Находим поля формы в DOM
  let nameInput = formElement.querySelector('#user-name');
  let jobInput = formElement.querySelector('#user-character');

  // Вставьте новые значения с помощью textContent
  nameInput.value = profileName.textContent;
  jobInput.value = profileCharacter.textContent;


  evt.preventDefault();
  popup.classList.add('popup_opened');
}

function popupClose(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#user-name');
let jobInput = formElement.querySelector('#user-character');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let nameInputText = nameInput.value;
  let jobInputText = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector('.profile__name');
  let profileCharacter = document.querySelector('.profile__character');
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInputText;
  profileCharacter.textContent = jobInputText;
  popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
// formElement.addEventListener('keydown', formSubmitHandler);
formElement.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    formSubmitHandler(event)
  }
});
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
  cardElement: '.elements__element',
  elementsImage: '.elements__image',
  elementsName: '.elements__name',
  editButton: '.profile__edit-button',
  addButton: '.profile__add-button',
  popupProfile: '.popup_profile',
  popupCard: '.popup_card',
  popupImg: '.popup_image',
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
  popupImage: '.popup__img',
  popupCaption: '.popup__caption',
  liked: 'elements__like-button_liked',
  buttonLike: '.elements__like-button',
  buttonDel: '.elements__trash',
  popupOpened: 'popup_opened',
  popupOpenedClass: '.popup_opened',
  cross: 'cross',
  crossImg: 'cross__img',
  elementsImageClass: 'elements__image',
  elementsTrashClass: 'elements__trash',
}

const root = document.querySelector(selectors.page);

// Шаблон карточки
const cardTemplate = root.querySelector(selectors.cardTemplate).content;
const cardElements = root.querySelector(selectors.cardElements);

// Находим кнопки
const buttonEdit = root.querySelector(selectors.editButton); // кнопка редактирования профиля
const buttonAdd = root.querySelector(selectors.addButton); // кнопка добавления карточки

// Находим попапы

const popupProfile = root.querySelector(selectors.popupProfile); // попап редактирования профиля
const popupCard = root.querySelector(selectors.popupCard); // попап добавления карточки

// попап картинки
const popupImg = root.querySelector(selectors.popupImg); // попап картинки
const imgOfPopupImg = popupImg.querySelector(selectors.popupImage); // сама картинка
const captionOfPopupImg = popupImg.querySelector(selectors.popupCaption); // подпись картинки
// попап картинки

// Находим форму редактирования профиля
const formElementProfile = popupProfile.querySelector(selectors.formProfile);

// Находим поля формы
const nameInput = formElementProfile.querySelector(selectors.nameInput);
const jobInput = formElementProfile.querySelector(selectors.jobInput);

// Находим элементы, откуда должны быть вставлены значения полей
const profileName = root.querySelector(selectors.profileName);
const profileCharacter = root.querySelector(selectors.profileCharacter);
// Форма редактирования профиля /

// Находим форму добавления карточки
const formElementCard = popupCard.querySelector(selectors.formCard);
// Находим поля формы добавления карточки
const nameCard = formElementCard.querySelector(selectors.nameCard);
const linkCard = formElementCard.querySelector(selectors.linkCard);
// Форма добавления карточки /

// Функция создания карточки
function createCard(link, name) {
  const cardElement = cardTemplate.querySelector(selectors.cardElement).cloneNode(true);
  const cardImg = cardElement.querySelector(selectors.elementsImage);
  const cardName = cardElement.querySelector(selectors.elementsName);
  const btnDel = cardElement.querySelector(selectors.buttonDel);
  const btnLike = cardElement.querySelector(selectors.buttonLike);

  cardImg.src = link;
  cardImg.alt = name;
  cardName.textContent = name;

  btnDel.addEventListener('click', () => cardElement.remove());

  btnLike.addEventListener('click', () => btnLike.classList.toggle(selectors.liked));

  cardImg.addEventListener('click', () => {
    imgOfPopupImg.src = link;
    imgOfPopupImg.alt = name;
    captionOfPopupImg.textContent = name;
    openPopup(popupImg);
  })

  return cardElement;
}

// Функция-обработчик события отправки формы карточки
function addCardEventListener() {
  formElementCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    cardElements.prepend(createCard(linkCard.value, nameCard.value));
    closePopup(popupCard);
  })
}
addCardEventListener();

// Функция создания исходных карточек
function createInitialCard() {
  initialCards.forEach((item) => cardElements.append(createCard(item.link, item.name)))
}
createInitialCard();

// ФУНКЦИИ //
// Функция закрытия попапа по кнопке Esc
function addEscPopupClose(evt) {
  if (evt.key === 'Escape') {
    const popupOpenedNode = root.querySelector(selectors.popupOpenedClass);
    closePopup(popupOpenedNode);
  }
}


// (Ненужная?) Функция проверки полей при открытии попапа
function checkInputOpen(popup) {
  const formElement = popup.querySelector(formSelectors.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
  const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
}

// Открываем попап
function openPopup(popup) {
  popup.classList.add(selectors.popupOpened);
  root.addEventListener('keydown', addEscPopupClose); // слушатель Escape
}

// Закрываем попап
function closePopup(popup) {
  popup.classList.remove(selectors.popupOpened);
  root.removeEventListener('keydown', addEscPopupClose); // удаляем слушатель Escape
}

// Функция закрытия попапа для всех кнопок закрытия
function closePopupAll(evt) {
  const target = evt.target;
  const modal = target.closest(selectors.popup);
  if (target.classList.contains(selectors.cross) || target.classList.contains(selectors.crossImg) || target === modal) {
    closePopup(modal);
  }
}

// Функция вставки значений из полей в профиль
function insertValuesFromFieldsToProfile() {
  profileName.textContent = nameInput.value;
  profileCharacter.textContent = jobInput.value;
}

// Функция вставки значений из документа в поле редактирования профиля
function insertValuesFromProfileToFields() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCharacter.textContent;
}

// Функция очистки полей добавления карточки и ошибок
function clearCardInputs() {
  const buttonElement = formElementCard.querySelector(formSelectors.submitButtonSelector);
  hideError(formElementCard, nameCard);
  hideError(formElementCard, linkCard);
  nameCard.value = '';
  linkCard.value = '';
  buttonElement.classList.add(formSelectors.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
}

// Функция «отправки» формы, профиля
function addFormSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  insertValuesFromFieldsToProfile(); // Вставляем новые значения из полей в документ с помощью textContent
  closePopup(popupProfile); // Закрываем попап
}

// СЛУШАТЕЛИ СОБЫТИЙ //

// обработчики кликов для закрытия каждого попапа
function addCloseListenerToAllPopup() {
  const popupList = Array.from(root.querySelectorAll(selectors.popup));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', closePopupAll);
  });
}
addCloseListenerToAllPopup();

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', addFormSubmitHandler); // форма профиля
// Открываем попап редактирования профиля по клику на кнопку
buttonEdit.addEventListener('click', () => {
  openPopup(popupProfile); // Открываем попап
  insertValuesFromProfileToFields(); // Вставляем значения из документа в поля формы с помощью textContent
  checkInputOpen(popupProfile); // (Ненужная?) Проверка полей введенных из документа
});
// Открываем попап добавления карточки
buttonAdd.addEventListener('click', () => {
  clearCardInputs();
  openPopup(popupCard); // Открываем попап
});
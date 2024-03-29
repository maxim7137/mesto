export const selectors = {
  cardTemplate: "#card-template",
  page: ".page",
  cardElements: ".elements",
  editButton: ".profile__edit-button",
  addButton: ".profile__add-button",
  popupProfile: ".popup_profile",
  popupCard: ".popup_card",
  formElement: ".popup__container",
  formProfile: ".popup__form_profile",
  formCard: ".popup__form_card",
  formCardNameError: ".card-name-input-error",
  formCardLinkError: ".card-address-input-error",
  nameInput: ".popup__input_user_name",
  jobInput: ".popup__input_user_character",
  profileName: ".profile__name",
  profileCharacter: ".profile__character",
  formElementCard: ".popup__container",
  nameCard: ".popup__input_card_name",
  linkCard: ".popup__input_card_address",
  popup: ".popup",
  popupOpened: "popup_opened",
  popupOpenedClass: ".popup_opened",
  cross: "cross",
  crossImg: "cross__img",
  elementsImageClass: "elements__image",
  elementsTrashClass: "elements__trash",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  popupDelete: ".popup_delete",
  popupImg: ".popup_image",
  popupImage: ".popup__img",
  popupCaption: ".popup__caption",
  popupAvatar: ".popup_avatar",
  avatarForm: ".popup__form_avatar",
  avatarEditButton: ".profile__cover",
};

export const validationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const selectorsOfCard = {
  cardElement: ".elements__element",
  elementsImage: ".elements__image",
  elementsName: ".elements__name",
  buttonLike: ".elements__like-button",
  buttonDel: ".elements__trash",
  liked: "elements__like-button_liked",
  likeCounter: ".elements__like-counter",
};

export const picturePopupSelectors = {
  popupImage: ".popup__img",
  popupCaption: ".popup__caption",
};

export const popupSelectors = {
  popup: ".popup",
  popupOpened: "popup_opened",
  cross: "cross",
  crossImg: "cross__img",
};

export const popupAvatarSelectors = {
  userAvatar: ".profile__avatar",
  inputSelector: ".popup__input",
};

export const popupWithFormSelectors = {
  popupProfile: ".popup_profile",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const root = document.querySelector(selectors.page); // Контейнер страницы

export const popupProfile = root.querySelector(selectors.popupProfile); // попап редактирования профиля
export const profileForm = popupProfile.querySelector(selectors.formProfile); // Форма редактирования профиля
export const profileButtonElement = profileForm.querySelector(selectors.submitButtonSelector); // кнопка отправки профиля

export const avatarPopup = root.querySelector(selectors.popupAvatar); // Попап редактирования аватара
export const avatarForm = avatarPopup.querySelector(selectors.avatarForm); // Форма редактирования аватара
export const avatarFormButton = avatarForm.querySelector(selectors.submitButtonSelector); // Кнопка отправки аватара

export const popupCard = root.querySelector(selectors.popupCard); // попап добавления карточки
export const cardForm = popupCard.querySelector(selectors.formCard); // Форма добавления карточки
export const cardFormButton = cardForm.querySelector(selectors.submitButtonSelector); // Кнопка отправки карточки

export const buttonAvatarEdit = root.querySelector(selectors.avatarEditButton); // кнопка редактирования аватара
export const buttonEdit = root.querySelector(selectors.editButton); // кнопка редактирования профиля
export const buttonAdd = root.querySelector(selectors.addButton); // кнопка добавления карточки
export const popupImg = document.querySelector(selectors.popupImg); // попап картинки
export const popupImgPicture = popupImg.querySelector(selectors.popupImage); // сама картинка
export const captionOfPopupImg = popupImg.querySelector(selectors.popupCaption); // подпись картинки
export const formElementProfile = popupProfile.querySelector(selectors.formProfile); // Форма редактирования профиля
export const nameInput = formElementProfile.querySelector(selectors.nameInput); // Находим поля формы
export const jobInput = formElementProfile.querySelector(selectors.jobInput); // Находим поля формы
export const profileName = root.querySelector(selectors.profileName); // Находим элементы, откуда должны быть вставлены значения полей
export const profileCharacter = root.querySelector(selectors.profileCharacter); // Находим элементы, откуда должны быть вставлены значения полей
export const formElementCard = popupCard.querySelector(selectors.formCard); // Форма добавления карточки
export const nameCard = formElementCard.querySelector(selectors.nameCard); // Находим поля формы добавления карточки
export const linkCard = formElementCard.querySelector(selectors.linkCard); // Находим поля формы добавления карточки
export const cardButtonElement = formElementCard.querySelector(selectors.submitButtonSelector); // Находим кнопку добавления карточки
export const cardsContainer = root.querySelector(selectors.cardElements); // Контейнер карточек

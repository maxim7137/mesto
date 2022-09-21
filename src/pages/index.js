import './index.css';

import {
  selectors,
  validationObject,
  profileForm,
  cardForm,
  avatarForm,
  buttonEdit,
  buttonAdd,
  buttonAvatarEdit,
  cardsContainer
} from '../utils/constants.js';

import Api from '../components/Api.js';
import PopupDelete from '../components/PopupDelete.js';
import PopupAvatar from '../components/PopupAvatar.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PicturePopup from '../components/PicturePopup.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// API
const api = new Api();

api.getInitialCards().then((result) => {
  cardsList.renderItems(result); // вставка карточек
  const cardsNodeList = cardsContainer.querySelectorAll('li'); // вставка лайков
  for (let i = 0; i < result.length; i++) {
    cardsNodeList[i].querySelector('span').textContent = result[i].likes.length;
  }
// проверка своих карточек
  api.getInitialUser().then((userResult) => {
    for (let i = 0; i < result.length; i++) {
      if (result[i].owner._id !== userResult._id) {
        cardsNodeList[i].querySelector('.elements__trash').remove();
      }
    }
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

api.getInitialUser().then((result) => {
  user.setUserInfo(result);
  popupAvatar.editAvatarFromApi(result.avatar);
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

// Функция создания карточки
function createCard(item) {
  const card = new Card(item, selectors.cardTemplate, handleOpenBigImage, handleOpenPopupDelete);
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
function handleOpenBigImage(link, name) {
  picturePopup.open(link, name);
}
// попап удаления каточки
const popupDelete = new PopupDelete(selectors.popupDelete);
popupDelete.setEventListeners();
function handleOpenPopupDelete(card) {
  popupDelete.setSubmitAction(() => card.deleteCard());
  popupDelete.open();
}
// попап редактирования профиля
const popupWithFormProfile = new PopupWithForm(selectors.popupProfile, _ => {
  api.setUser(popupWithFormProfile.getInputValues()).then((result) => {
    user.setUserInfo(result);
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});
  popupWithFormProfile.close();
});
popupWithFormProfile.setEventListeners();

// попап редактирования аватара
const popupAvatar = new PopupAvatar(selectors.popupAvatar,
  (event) => {
    event.preventDefault();
    api.setAvatar(popupAvatar._input.value).then((result) => {
      popupAvatar.editAvatarFromApi(result.avatar);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
    popupAvatar.close();
  }
);
popupAvatar.setEventListeners();

// попап создания карточки
const popupWithFormCard = new PopupWithForm(selectors.popupCard,
  (evt) => {
    evt.preventDefault();

    api.setCard(popupWithFormCard.getInputValues()).then((result) => {
      cardsList.prependItem(createCard(result));
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

  /*
    const submitCard = popupWithFormCard.getInputValues();
    const cardElement = createCard(submitCard);
    cardsList.prependItem(cardElement);
 */

    popupWithFormCard.close();
  });

popupWithFormCard.setEventListeners();

// создание начальных карточек
const cardsList = new Section({
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    }
  },
  selectors.cardElements
);

// Создаем для каждой проверяемой формы экземпляр класса FormValidator.
const profileFormValidator = new FormValidator(validationObject, profileForm);
profileFormValidator.enableValidation(); // Запускаем валидацию
const cardFormValidator = new FormValidator(validationObject, cardForm);
cardFormValidator.enableValidation(); // Запускаем валидацию
const avatarFormValidator = new FormValidator(validationObject, avatarForm);
avatarFormValidator.enableValidation(); // Запускаем валидацию

// Открываем попап редактирования профиля по клику на кнопку
buttonEdit.addEventListener('click', () => {
  popupWithFormProfile.open(); // Открываем попап
  popupWithFormProfile.setInputValues(user.getUserInfo()); // Заполняем инпуты
  profileFormValidator.hideErrors(); // Проверяем инпуты при открытии
});

// Открываем попап редактирования аватара профиля по клику на аватар
  buttonAvatarEdit.addEventListener('click', () => {
    popupAvatar.open(); // Открываем попап
    avatarFormValidator.hideErrors(); // Скрываем ошибки при открытии пустой формы
    avatarFormValidator.disableButtonState(); // Выключаем кнопку
});

// Открываем попап добавления карточки
buttonAdd.addEventListener('click', () => {
  popupWithFormCard.open(); // Открываем попап
  cardFormValidator.hideErrors(); // Скрываем ошибки при открытии пустой формы
  cardFormValidator.disableButtonState(); // Выключаем кнопку
});
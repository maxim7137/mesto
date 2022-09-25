import "./index.css";

import {
  selectors,
  validationObject,
  selectorsOfCard,
  profileForm,
  cardForm,
  avatarForm,
  buttonAvatarEdit,
  buttonEdit,
  buttonAdd,
  cardsContainer,
  profileButtonElement,
  avatarFormButton,
  cardFormButton,
} from "../utils/constants.js";

import { renderLoading } from "../utils/utils.js";

import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PicturePopup from "../components/PicturePopup.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// API
const api = new Api();

// Загрузка данных профиля
api
  .getInitialUser()
  .then((result) => {
    user.setUserInfo(result);
    popupAvatar.editAvatarFromApi(result.avatar);
    const userId = result._id;

    // Загрузка начальных карточек
    api
      .getInitialCards()
      .then((result) => {
        cardsList.renderItems(result); // вставка карточек
        const cardsNodeList = cardsContainer.querySelectorAll("li"); // вставка лайков
        for (let i = 0; i < result.length; i++) {
          cardsNodeList[i].querySelector("span").textContent =
            result[i].likes.length;
        }
        // проверка своих карточек
        // лайкнута ли мной
        function isLiked(array) {
          const arrayOfLikedId = [];
          array.forEach((element) => {
            arrayOfLikedId.push(element._id);
          });
          const containsUserId = arrayOfLikedId.some(
            (element) => element === userId
          );
          return containsUserId;
        } // лайкнута ли мной //

        for (let i = 0; i < result.length; i++) {
          // для удаления
          if (result[i].owner._id !== userId) {
            cardsNodeList[i].querySelector(".elements__trash").remove();
          }
          // для лайков
          if (isLiked(result[i].likes)) {
            cardsNodeList[i]
              .querySelector(selectorsOfCard.buttonLike)
              .classList.add(selectorsOfCard.liked);
          }
        }
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    // Загрузка начальных карточек //
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// Функция создания карточки
function createCard(item) {
  const card = new Card(
    item,
    selectors.cardTemplate,
    handleOpenBigImage,
    handleOpenPopupDelete,
    handleLike
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// лайки
function handleLike(card) {
  if (card.buttonLike.classList.contains(selectorsOfCard.liked)) {
    api
      .dislikeCard(card.getCardId())
      .then((result) => {
        card.likeCounter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  } else {
    api
      .likeCard(card.getCardId())
      .then((result) => {
        card.likeCounter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
}

// Юзер
const user = new UserInfo({
  userNameSelector: selectors.profileName,
  userJobSelector: selectors.profileCharacter,
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
  popupDelete.setSubmitAction(() => {
    api
      .delCard(card.getCardId())
      .then(popupDelete.close())
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    card.deleteCard();
  });
  popupDelete.open();
}

// попап редактирования профиля
const popupWithFormProfile = new PopupWithForm(
  selectors.popupProfile,
  (data) => {
    renderLoading(true, profileButtonElement, "Сохранение...", "Сохранить");
    api
      .setUser(data)
      .then((result) => {
        user.setUserInfo(result);
        popupWithFormProfile.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        renderLoading(
          false,
          profileButtonElement,
          "Сохранение...",
          "Сохранить"
        );
      });
  }
);
popupWithFormProfile.setEventListeners();

// попап редактирования аватара
const popupAvatar = new PopupWithForm(selectors.popupAvatar, () => {
  renderLoading(true, avatarFormButton, "Сохранение...", "Сохранить");
  api
    .setAvatar(popupAvatar._input.value)
    .then((result) => {
      popupAvatar.editAvatarFromApi(result.avatar);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, avatarFormButton, "Сохранение...", "Сохранить");
    });
});
popupAvatar.setEventListeners();

// попап создания карточки cardFormButton
const popupWithFormCard = new PopupWithForm(selectors.popupCard, (data) => {
  renderLoading(true, cardFormButton, "Создание...", "Создать");
  api
    .setCard(data)
    .then((result) => {
      cardsList.prependItem(createCard(result));
      popupWithFormCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, cardFormButton, "Создание...", "Создать");
    });
});
popupWithFormCard.setEventListeners();

// создание начальных карточек
const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.appendItem(cardElement);
    },
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
buttonEdit.addEventListener("click", () => {
  popupWithFormProfile.open(); // Открываем попап
  popupWithFormProfile.setInputValues(user.getUserInfo()); // Заполняем инпуты
  profileFormValidator.hideErrors(); // Проверяем инпуты при открытии
});

// Открываем попап редактирования аватара профиля по клику на аватар
buttonAvatarEdit.addEventListener("click", () => {
  popupAvatar.open(); // Открываем попап
  avatarFormValidator.hideErrors(); // Скрываем ошибки при открытии пустой формы
  avatarFormValidator.disableButtonState(); // Выключаем кнопку
});

// Открываем попап добавления карточки
buttonAdd.addEventListener("click", () => {
  popupWithFormCard.open(); // Открываем попап
  cardFormValidator.hideErrors(); // Скрываем ошибки при открытии пустой формы
  cardFormValidator.disableButtonState(); // Выключаем кнопку
});

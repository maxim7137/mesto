import Popup from "./Popup.js";
<<<<<<< HEAD
import { popupAvatarSelectors } from "../utils/constants.js";
import { popupWithFormSelectors } from "../utils/constants.js";
=======

const popupWithFormSelectors = {
  popupProfile: ".popup_profile",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
>>>>>>> ed6aa5c7fe0ae53b2741bc93c1980c871f1abb5c

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._popup.querySelectorAll(
      popupWithFormSelectors.inputSelector
    );
    this._form = this._popup.querySelector("form");
<<<<<<< HEAD

    this._input = this._popup.querySelector(popupAvatarSelectors.inputSelector);
    this._userAvatar = document.querySelector(popupAvatarSelectors.userAvatar);
=======
>>>>>>> ed6aa5c7fe0ae53b2741bc93c1980c871f1abb5c
  }

  getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  setInputValues = (data) => {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  };
<<<<<<< HEAD

  editAvatarFromApi(link) {
    this._userAvatar.src = link;
  }
=======
>>>>>>> ed6aa5c7fe0ae53b2741bc93c1980c871f1abb5c

  setEventListeners(evt) {
    super.setEventListeners(evt);
    this._popup.addEventListener("submit", this._handleSubmitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}

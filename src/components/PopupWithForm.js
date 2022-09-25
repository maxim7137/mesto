import Popup from "./Popup.js";
import { popupAvatarSelectors } from "../utils/constants.js";
import { popupWithFormSelectors } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._popup.querySelectorAll(
      popupWithFormSelectors.inputSelector
    );
    this._form = this._popup.querySelector("form");

    this._input = this._popup.querySelector(popupAvatarSelectors.inputSelector);
    this._userAvatar = document.querySelector(popupAvatarSelectors.userAvatar);
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

  editAvatarFromApi(link) {
    this._userAvatar.src = link;
  }

  setEventListeners(evt) {
    super.setEventListeners(evt);
    this._popup.addEventListener("submit", this._handleSubmitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}

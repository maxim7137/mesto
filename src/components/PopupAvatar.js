import Popup from "./Popup.js";

const popupAvatarSelectors = {
  userAvatar: ".profile__avatar",
  inputSelector: ".popup__input",
};

export default class PopupAvatar extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._input = this._popup.querySelector(popupAvatarSelectors.inputSelector);
    this._form = this._popup.querySelector("form");
    this._userAvatar = document.querySelector(popupAvatarSelectors.userAvatar);
  }

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
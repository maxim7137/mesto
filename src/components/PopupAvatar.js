import Popup from './Popup.js';

const popupAvatarSelectors = {
  userAvatar: '.profile__avatar',
  inputSelector: '.popup__input',
}

export default class PopupAvatar extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._input = this._popup.querySelector(popupAvatarSelectors.inputSelector);
    this._form = this._popup.querySelector('form');
    this._userAvatar = document.querySelector(popupAvatarSelectors.userAvatar);
  }

  _editAvatar() {
    this._userAvatar.src = this._input.value;
  }

  setEventListeners(evt) {
    super.setEventListeners(evt);
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._editAvatar();
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
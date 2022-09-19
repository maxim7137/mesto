import Popup from './Popup.js';

const popupDeleteSelectors = {

}

export default class PopupDelete extends Popup {
  constructor(popupSelector, handleSubmitDelete) {
    super(popupSelector);
    this._handleSubmitDelete = handleSubmitDelete;
    this._form = this._popup.querySelector('form');
  }

  setEventListeners(evt) {
    super.setEventListeners(evt);
    this._popup.addEventListener('submit', this._handleSubmitDelete);
  }

  open = _ => super.open();
}
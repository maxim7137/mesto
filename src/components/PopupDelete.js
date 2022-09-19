import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('form');
  }

  setSubmitAction(action) {
    this._submitHandlerDelete = action;
  }

  setEventListeners () {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandlerDelete(event);
      this.close();
    });
  }
}


import Popup from './Popup.js';
const popupWithFormSelectors = {
  popupProfile: '.popup_profile',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._popup.querySelectorAll(popupWithFormSelectors.inputSelector);
  }

  _getInputValues = () => {

    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  setInputValues = (data) => {
    this._inputList.forEach( input => {
      input.value = data[input.name];
    });
  }

  setEventListeners(evt) {
    super.setEventListeners(evt);
    this._popup.addEventListener('submit', this._handleSubmitForm);
  }



  close() {
    super.close();
    this._popup.querySelector('form').reset();
  }
}
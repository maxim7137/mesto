import {
  root,
  selectors
} from './constants.js';

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add(selectors.popupOpened);
    root.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
  };

  close() {
    this._popup.classList.remove(selectors.popupOpened);
    root.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._closePopupByClick);
  };

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener('click', this._closePopupByClick);
  };

  _closePopupByClick = (evt) => {
    const target = evt.target;
    const modal = target.closest(selectors.popup);
    if (target.classList.contains(selectors.cross) || target.classList.contains(selectors.crossImg) || target === modal) {
      this.close();
    }
  }
}

export class PopupWithImage extends Popup {
  handleCardClick = (link, name) => {
    this._popupImgPicture = document.querySelector(selectors.popupImage);
    this._captionOfPopupImg = document.querySelector(selectors.popupCaption);

    this._popupImgPicture.src = link;
    this._popupImgPicture.alt = name;
    this._captionOfPopupImg.textContent = name;
    this.open();
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  open() {
    super.open();
    this._resetForm();
  }

  _resetForm = () => {

    if (this._popup.matches(selectors.popupProfile)) {
      const inputList = Array.from(this._popup.querySelectorAll(selectors.inputSelector));
      inputList.forEach((inputElement) => {
        const errorElement = this._popup.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(selectors.inputErrorClass);
        errorElement.classList.remove(selectors.errorClass);
        errorElement.textContent = '';
      });
    } else {
      const inputList = Array.from(this._popup.querySelectorAll(selectors.inputSelector));
      inputList.forEach((inputElement) => {
        const errorElement = this._popup.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(selectors.inputErrorClass);
        errorElement.classList.remove(selectors.errorClass);
        errorElement.textContent = '';
        inputElement.value = '';
      });
    }
  }

  _getInputValues = () => {
    const inputList = (this._popup.querySelectorAll(selectors.inputSelector));
    if (this._popup.matches(selectors.popupProfile)) {
      const { 0: name, 1: job } = inputList;
      const userData = { userName: name.value, userJob: job.value };
      return userData;
    } else {
      const { 0: name, 1: link } = inputList;
      const cardData = { cardName: name.value, cardLink: link.value };
      return cardData;
    }
  };

  setEventListeners(evt) {
    super.setEventListeners(evt);
    if (this._popup.matches(selectors.popupProfile)) {
      this._popup.addEventListener('submit', this._handleSubmitForm);
    }
  }

  close() {
    super.close();
    if (this._popup.matches(selectors.popupCard)) {
      this._popup.querySelector(selectors.formCard).reset();
    }
  }
}
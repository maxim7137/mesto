import {
  root,
  selectors
} from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add(selectors.popupOpened);
    root.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove(selectors.popupOpened);
    root.removeEventListener('keydown', this._handleEscClose);
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
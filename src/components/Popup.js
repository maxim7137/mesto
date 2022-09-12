const popupSelectors = {
  popup: '.popup',
  popupOpened: 'popup_opened',
  cross: 'cross',
  crossImg: 'cross__img'
}

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add(popupSelectors.popupOpened);
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove(popupSelectors.popupOpened);
    document.removeEventListener('keydown', this._handleEscClose);
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

    if (target.classList.contains(popupSelectors.cross) ||
      target.classList.contains(popupSelectors.crossImg) ||
      target === this._popup) {
      this.close();
    }
  }
}
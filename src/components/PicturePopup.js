import Popup from './Popup.js';

const picturePopupSelectors = {
  popupImage: '.popup__img',
  popupCaption: '.popup__caption'
}

export default class PicturePopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgPicture = this._popup.querySelector(picturePopupSelectors.popupImage);
    this._captionOfPopupImg = this._popup.querySelector(picturePopupSelectors.popupCaption);
  }

  open (link, name) {
    this._popupImgPicture.src = link;
    this._popupImgPicture.alt = name;
    this._captionOfPopupImg.textContent = name;
    super.open();
  }
}
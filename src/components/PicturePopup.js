import { selectors } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PicturePopup extends Popup {
  handleCardClick = (link, name) => {
    this._popupImgPicture = document.querySelector(selectors.popupImage);
    this._captionOfPopupImg = document.querySelector(selectors.popupCaption);

    this._popupImgPicture.src = link;
    this._popupImgPicture.alt = name;
    this._captionOfPopupImg.textContent = name;
    this.open();
  }
}
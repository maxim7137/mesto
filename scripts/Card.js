const selectors = {
  cardElement: '.elements__element',
  elementsImage: '.elements__image',
  elementsName: '.elements__name',
  buttonLike: '.elements__like-button',
  buttonDel: '.elements__trash',
  liked: 'elements__like-button_liked',
  popupImg: '.popup_image',
  popupImage: '.popup__img',
  popupCaption: '.popup__caption'
}

const popupImg = document.querySelector(selectors.popupImg); // попап картинки
const popupImgPicture = popupImg.querySelector(selectors.popupImage); // сама картинка
const captionOfPopupImg = popupImg.querySelector(selectors.popupCaption); // подпись картинки

export default class Card {
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.openPopup = openPopup;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this._templateSelector).content
      .querySelector(selectors.cardElement).cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getCardElement();

    this.elImg = this._cardElement.querySelector(selectors.elementsImage);

    this.elImg.src = this._link;
    this.elImg.alt = this._name;
    this._cardElement.querySelector(selectors.elementsName).textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector(selectors.buttonDel).addEventListener('click', _ => this._deleteClick());
    this._cardElement.querySelector(selectors.buttonLike).addEventListener('click', _ => this._likeClick());
    this.elImg.addEventListener('click', _ => this._popupClick());
  }

  _deleteClick() {
    this._cardElement.remove();
  }

  _likeClick() {
    this._cardElement.querySelector(selectors.buttonLike).classList.toggle(selectors.liked);
  }

  _popupClick() {
    popupImgPicture.src = this._link;
    popupImgPicture.alt = this._name;
    captionOfPopupImg.textContent = this._name;
    this.openPopup(popupImg);
  }
}
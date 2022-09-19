const selectorsOfCard = {
  cardElement: '.elements__element',
  elementsImage: '.elements__image',
  elementsName: '.elements__name',
  buttonLike: '.elements__like-button',
  buttonDel: '.elements__trash',
  liked: 'elements__like-button_liked',
  likeCounter: '.elements__like-counter'
}

export default class Card {
  constructor({
    name,
    link
  }, templateSelector, handleOpenBigImage) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this.handleOpenBigImage = handleOpenBigImage;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this._templateSelector).content
      .querySelector(selectorsOfCard.cardElement).cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getCardElement();
    this._buttonLike = this._cardElement.querySelector(selectorsOfCard.buttonLike);
    this._buttonDel = this._cardElement.querySelector(selectorsOfCard.buttonDel);
    this._likeCounter = this._cardElement.querySelector(selectorsOfCard.likeCounter);

    this.elImg = this._cardElement.querySelector(selectorsOfCard.elementsImage);

    this.elImg.src = this._link;
    this.elImg.alt = this._name;
    this._cardElement.querySelector(selectorsOfCard.elementsName).textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._buttonDel.addEventListener('click', _ => this._deleteCard());
    this._buttonLike.addEventListener('click', _ => this._toggleLike());
    this.elImg.addEventListener('click', _ => this._handleImageClick());
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _toggleLike() {
    if (this._buttonLike.classList.contains(selectorsOfCard.liked)) {
      this._likeCounter.textContent--;
    } else {
      this._likeCounter.textContent++;
    }
    this._buttonLike.classList.toggle(selectorsOfCard.liked);
  }

  _handleImageClick() {
    this.handleOpenBigImage(this._link, this._name);
  }
}
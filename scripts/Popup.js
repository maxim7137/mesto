import {
  root, selectors
} from "./constants";

class Popup {
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
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };
  setEventListeners() {
    this._popup.addEventListener('click', this._closePopupByClick);
  };
  _closePopupByClick(evt) {
    const target = evt.target;
    const modal = target.closest(selectors.popup);
    if (target.classList.contains(selectors.cross) || target.classList.contains(selectors.crossImg) || target === modal) {
      this.close();
    }
  }
}

class PopupWithImage extends Popup {
  handleCardClick(link, name) {
    popupImgPicture.src = link;
    popupImgPicture.alt = name;
    captionOfPopupImg.textContent = name;
    this.open();
  }
}


class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  open() {
    super.open();
    this._getInputValues;
  }

  _getInputValues() {
    if (this._popup.matches(selectors.popupProfile)) {
      nameInput.value = profileName.textContent;
      jobInput.value = profileCharacter.textContent;

      const buttonElement = formElementProfile.querySelector(selectors.submitButtonSelector);
      const inputList = Array.from(formElementProfile.querySelectorAll(selectors.inputSelector));
      inputList.forEach((inputElement) => {
        const errorElement = formElementProfile.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(selectors.inputErrorClass);
        errorElement.classList.remove(selectors.errorClass);
        errorElement.textContent = '';
      });
      profileFormValidator.enableButtonState(buttonElement);
    } else {
      const buttonElement = formElementCard.querySelector(selectors.submitButtonSelector);
      const inputList = Array.from(formElementCard.querySelectorAll(selectors.inputSelector));
      inputList.forEach((inputElement) => {
        const errorElement = formElementCard.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(selectors.inputErrorClass);
        errorElement.classList.remove(selectors.errorClass);
        errorElement.textContent = '';
        inputElement.value = '';
      });
      cardFormValidator.disableButtonState(buttonElement);
    }
  }

  setEventListeners(evt) {
    super.setEventListeners(evt);
    if (this._popup.matches(selectors.popupProfile)) {
      this._popup.addEventListener('submit', this._submitProfileForm);
    }
  }
  _submitProfileForm() {
    profileName.textContent = nameInput.value;
    profileCharacter.textContent = jobInput.value;
    this.close();
  }

  close() {
    super.close();
    if (this._popup.matches(selectors.popupCard)) {
      this._popup.querySelector(selectors.formCard).reset();
    }
  }
}
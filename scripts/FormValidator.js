export default class FormValidator {
  constructor(configObject, formEl) {
    this._formSelector = configObject.formSelector;
    this._inputSelector = configObject.inputSelector;
    this._submitButtonSelector = configObject.submitButtonSelector;
    this._inactiveButtonClass = configObject.inactiveButtonClass;
    this._inputErrorClass = configObject.inputErrorClass;
    this._errorClass = configObject.errorClass;
    this._formEl = formEl;
  }
  // Метод вывода сообщения об ошибке
  _showError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };
  // Метод скрытия сообщения об ошибке
  _hideError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  // Метод переключения видимости ошибки в зависимости от валидности инпута
  _checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(formElement, inputElement);
    } else {
      this._showError(formElement, inputElement, inputElement.validationMessage);
    }
  };
  // Метод проверки есть ли хоть один невалидный инпут
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };
  // Метод переключения кнопки в зависимости от предыдущей проверки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButtonState(buttonElement);
    } else {
      this.enableButtonState(buttonElement);
    }
  }
  // Метод развешивания всего выше на все инпуты в форме
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', _ => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
  // Методы сброса кнопки сохранения
  // Метод отключения кнопки
  disableButtonState(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  }
  // Метод включения кнопки
  enableButtonState(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }

  // Метод проверки формы
  enableValidation() {
    this._formEl.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners(this._formEl);
  };
}
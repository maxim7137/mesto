export default class FormValidator {
  constructor({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }, formEl) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formEl = formEl;


  }
  // Метод вывода сообщения об ошибке
  _showError(inputElement, errorMessage) {
    const errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };
  // Метод скрытия сообщения об ошибке
  _hideError(inputElement) {
    const errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  // Метод переключения видимости ошибки в зависимости от валидности инпута
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement, inputElement.validationMessage);
    }
  };
  // Метод проверки есть ли хоть один невалидный инпут
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  };
  // Метод переключения кнопки в зависимости от предыдущей проверки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButtonState(this._buttonElement);
    } else {
      this.enableButtonState(this._buttonElement);
    }
  }
  // Метод развешивания всего выше на все инпуты в форме
  _setEventListeners() {
    this._inputList = Array.from(this._formEl.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formEl.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', _ => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
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
    this._setEventListeners();
  };
}
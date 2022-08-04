// функция для вывода сообщения об ошибке
const showError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.classList.add(obj.errorClass);
  errorElement.textContent = errorMessage;
};

// функция скрытия сообщения об ошибке
const hideError = (formElement, inputElement, obj) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};

// функция переключения функций видимости ошибки
const checkInputValidity = (formElement, inputElement, obj) => {

  if (inputElement.validity.valid) {
    hideError(formElement, inputElement, obj);
  } else {
    showError(formElement, inputElement, inputElement.validationMessage, obj);
  }
};

// функция проверки есть ли хоть один невалидный инпут
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// функция переключения кнопки в зависимости от предыдущей функции
const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

// функция развешивания всего выше на все инпуты в форме
const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

// функция развешивания всего выше на все формы на странице
const enableValidation = (obj) => {
  const formList = document.querySelectorAll(obj.formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, obj);
  });
};

/*
const initialOject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
 */

// вызов функции валидации всех форм
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
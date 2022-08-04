// селекторы
const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// функция для вывода сообщения об ошибке
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formSelectors.inputErrorClass);
  errorElement.classList.add(formSelectors.errorClass);
  errorElement.textContent = errorMessage;
};

// функция скрытия сообщения об ошибке
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formSelectors.inputErrorClass);
  errorElement.classList.remove(formSelectors.errorClass);
  errorElement.textContent = '';
};

// функция переключения функций видимости ошибки и отключения клавиши Enter
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement);
  } else {
    showError(formElement, inputElement, inputElement.validationMessage);
  }
};

// функция проверки есть ли хоть один невалидный инпут
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// функция переключения кнопки в зависимости от предыдущей функции
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formSelectors.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(formSelectors.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}


// функция развешивания всего выше на все инпуты в форме
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
  const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// функция развешивания всего выше на все формы на странице
const enableValidation = () => {
  const formList = Array.from(root.querySelectorAll(formSelectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// вызов функции валидации всех форм
enableValidation();

/* enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});  */
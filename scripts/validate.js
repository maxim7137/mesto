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
const hideError = (formElement, inputElement, ) => {
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

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formSelectors.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(formSelectors.inactiveButtonClass);
  }
}

// функция отключения клавиши Enter
const disableEnter = (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
  }
}

const toggleEnterState = (inputList, formElement) => {
  if (!hasInvalidInput(inputList)) {
    formElement.removeEventListener('keydown', disableEnter);
  } else {
    formElement.addEventListener('keydown', disableEnter);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
  const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  toggleEnterState(inputList, formElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
      toggleEnterState(inputList, formElement);
    });
  });
};


const enableValidation = () => {
  const formList = Array.from(root.querySelectorAll(formSelectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

/* enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});  */
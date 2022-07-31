const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const form = root.querySelector(formSelectors.formSelector);
const formInput = form.querySelector(formSelectors.inputSelector);
const formError = form.querySelector(`.${formInput.id}-error`);

const showError = (input, errorMessage) => {
  input.classList.add(formSelectors.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(formSelectors.errorClass);
};

const hideError = (input) => {
  input.classList.remove(formSelectors.inputErrorClass);
  formError.classList.remove(formSelectors.errorClass);
  formError.textContent = '';
};

const checkInputValidity = () => {
  if (!formInput.validity.valid) {
    showError(formInput, formInput.validationMessage);
  } else {
    hideError(formInput);
  }
};

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});


















/* enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});  */
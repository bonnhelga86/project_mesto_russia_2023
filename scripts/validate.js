const showError = (input, {errorMessageSelector, textErrorClass, inputErrorClass}) => {
  const errorMessage = document.querySelector(`${errorMessageSelector}${input.name}`);
  errorMessage.textContent = input.validationMessage;
  errorMessage.classList.add(textErrorClass);

  input.classList.add(inputErrorClass);
}

const hideError = (input, {errorMessageSelector, textErrorClass, inputErrorClass}) => {
  const errorMessage = document.querySelector(`${errorMessageSelector}${input.name}`);
  errorMessage.textContent = '';
  errorMessage.classList.remove(textErrorClass);

  input.classList.remove(inputErrorClass);
}

const isInputValid = (input, config) => input.validity.valid ? hideError(input, config) : showError(input, config);

const hasInvalidInput = inputList => {
  return Array.from(inputList).some(input => !input.validity.valid);
}

const toggleSubmitButton = (submitButton, inputList) => submitButton.disabled = hasInvalidInput(inputList);

const setEventListener = (input, submitButton, inputList, config) => {
  input.addEventListener('input', event => {
    isInputValid(event.target, config);
    toggleSubmitButton(submitButton, inputList);
  });
}

const enableValidation = config => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(form => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputList.forEach(input => setEventListener(input, submitButton, inputList, config))
  })
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  errorMessageSelector: '.form__text-error_type_',
  inputErrorClass: 'form__input_error',
  textErrorClass: 'form__text-error_visible'
});

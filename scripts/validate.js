const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  errorMessageSelector: '.form__text-error_type_',
  inputErrorClass: 'form__input_error',
  textErrorClass: 'form__text-error_visible'
}

const showError = (input) => {
  const errorMessage = document.querySelector(`${configValidation.errorMessageSelector}${input.name}`);
  errorMessage.textContent = input.validationMessage;
  errorMessage.classList.add(`${configValidation.textErrorClass}`);

  input.classList.add(`${configValidation.inputErrorClass}`);
}

const hideError = (input) => {
  const errorMessage = document.querySelector(`${configValidation.errorMessageSelector}${input.name}`);
  errorMessage.textContent = '';
  errorMessage.classList.remove(`${configValidation.textErrorClass}`);

  input.classList.remove(`${configValidation.inputErrorClass}`);
}

const isInputValid = (input) => {
  if (input.validity.valid) {
    hideError(input);
  } else {
    showError(input);
  }
}

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some(input => {
    return !input.validity.valid;
  });
}

const toggleSubmitButton = (submitButton, inputList) => {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

const setEventListener = (input, submitButton, inputList) => {
  input.addEventListener('input', event => {
    isInputValid(event.target);
    toggleSubmitButton(submitButton, inputList);
  });
}

const enableValidation = (config) => {
  const formList = document.querySelectorAll(`${config.formSelector}`);
  formList.forEach(form => {
    const inputList = form.querySelectorAll(`${config.inputSelector}`);
    const submitButton = form.querySelector(`${config.submitButtonSelector}`);

    inputList.forEach(input => {
      setEventListener(input, submitButton, inputList);
    })

    // toggleSubmitButton(submitButton, inputList);
  })
}

enableValidation(configValidation);

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  errorMessageSelector: '.form__text-error_type_',
  inputErrorClass: 'form__input_error',
  textErrorClass: 'form__text-error_visible'
}

// Функция показа текста сообщения об ошибке
const showError = (input, {errorMessageSelector, textErrorClass, inputErrorClass}) => {
  const errorMessage = document.querySelector(`${errorMessageSelector}${input.name}`);
  errorMessage.textContent = input.validationMessage;
  errorMessage.classList.add(textErrorClass);

  input.classList.add(inputErrorClass);
}

// Функция удаления текста сообщения об ошибке
const hideError = (input, {errorMessageSelector, textErrorClass, inputErrorClass}) => {
  const errorMessage = document.querySelector(`${errorMessageSelector}${input.name}`);
  errorMessage.textContent = '';
  errorMessage.classList.remove(textErrorClass);

  input.classList.remove(inputErrorClass);
}

// Функции смены состояния кнопки submit
const enableSubmitButton = (submitButton) => {
  submitButton.disabled = false;
}

const disableSubmitButton = (submitButton) => {
  submitButton.disabled = true;
}

// Функция удаления ошибок валидации
const removeValidationErrors = (popup) => {
  popup.querySelectorAll('.form__input').forEach(popupInput => {
    hideError(popupInput, {
      errorMessageSelector: '.form__text-error_type_',
      inputErrorClass: 'form__input_error',
      textErrorClass: 'form__text-error_visible'
    });
  });
  enableSubmitButton(popup.querySelector('.popup__button'));
}

// Функция проверки input на валидность
const isInputValid = (input, config) => {
  input.validity.valid ? hideError(input, config) : showError(input, config)
};

// Функция проверки полей в форме на валидность
const hasInvalidInput = inputList => {
  return Array.from(inputList).some(input => !input.validity.valid);
}

// Функция включения/выключения активной кнопки
const toggleSubmitButton = (submitButton, inputList) => {
  submitButton.disabled = hasInvalidInput(inputList)
};

// Функция добавления событий полям формы
const setEventListener = (input, submitButton, inputList, config) => {
  input.addEventListener('input', event => {
    isInputValid(event.target, config);
    toggleSubmitButton(submitButton, inputList);
  });
}

// Функция включения валидации форм
const enableValidation = config => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(form => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputList.forEach(input => setEventListener(input, submitButton, inputList, config))
  })
}

enableValidation(validationConfig);

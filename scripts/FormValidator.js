export class FormValidator {
  constructor(validationConfig, form) {
    this._config = validationConfig;
    this._form = form;
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  _hideError(input) {
    const errorMessage = this._form.querySelector(`${this._config.errorMessageSelector}${input.name}`);
    errorMessage.textContent = '';
    errorMessage.classList.remove(this._config.textErrorClass);

    input.classList.remove(this._config.inputErrorClass);
  }

  _showError(input) {
    const errorMessage = this._form.querySelector(`${this._config.errorMessageSelector}${input.name}`);
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this._config.textErrorClass);

    input.classList.add(this._config.inputErrorClass);
  }

  _isInputValid(input) {
    input.validity.valid ? this._hideError(input) : this._showError(input);
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some(input => !input.validity.valid);
  }

  _toggleSubmitButton() {
    this._submitButton.disabled = this._hasInvalidInput();
  }

  _setEventListener() {
    this._inputList.forEach(input => {
      input.addEventListener('input', event => {
        this._isInputValid(event.target);
        this._toggleSubmitButton();
      });
    });
  }

  removeValidationErrors = () => {
    this._inputList.forEach(input => {
      this._hideError(input);
    });
  }

  enableSubmitButton = () => {
    this._submitButton.disabled = false;
  }

  disableSubmitButton = () => {
    this._submitButton.disabled = true;
  }

  enableValidation = () => {
    this._setEventListener();
  }
}

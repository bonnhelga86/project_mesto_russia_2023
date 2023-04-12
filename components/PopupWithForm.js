import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackSubmit }) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues() {
    return Array.from(this._form.querySelectorAll('.form__input'))
    .reduce( (result, input) => ({ ...result, [input.name] : input.value }), {});
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', event => this._callbackSubmit(event, this._getInputValues()));
  }

  close() {
    super.close();
    this._form.reset();
  }

}

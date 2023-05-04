import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackSubmit }) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues = () => {
    return Array.from(this._form.querySelectorAll('.form__input'))
    .reduce( (result, input) => ({ ...result, [input.name] : input.value }), {});
  }

  setInputValues = (values) => {
    Object.keys(values).forEach(key => {
      if(this._form[key]) this._form[key].value = values[key];
    })
  }

  _hanldeSubmitClick = event => this._callbackSubmit(event, this._getInputValues(), this._popup);

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._hanldeSubmitClick);
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._hanldeSubmitClick);
    this._form.reset();
  }

}

import { Popup } from './Popup.js';

export class PopupForDelete extends Popup {
  constructor(popupSelector, { handleButtonClick }) {
    super(popupSelector);
    this._handleButtonClick = handleButtonClick;
    this._button = this._popup.querySelector('.button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', this._handleButtonClick);
  }

  close() {
    super.close();
    this._button.removeEventListener('click', this._handleButtonClick);
  }
}

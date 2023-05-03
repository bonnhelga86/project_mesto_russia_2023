import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleButtonClick }) {
    super(popupSelector);
    this._handleButtonClick = handleButtonClick;
    this._button = this._popup.querySelector('.button');
  }

  _deleteCard = () => {
    this._handleButtonClick(this._elementForDelete, this._cardId);
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', this._deleteCard);
  }

  open(elementForDelete, cardId) {
    super.open();
    this._cardId = cardId;
    this._elementForDelete = elementForDelete;
  }

  close() {
    super.close();
    this._button.removeEventListener('click', this._deleteAction);
  }
}

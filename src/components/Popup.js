export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = event => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleCloseClick = event => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleCloseClick);
    document.addEventListener('keyup', this._handleEscClose);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleCloseClick);
  }
}

import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._popupImagePhoto = this._popup.querySelector('.popup-image__photo');
    this._popupImageCaption = this._popup.querySelector('.popup-image__caption');
  }

  open() {
    super.open();

    this._popupImagePhoto.src = this._link;
    this._popupImagePhoto.alt = this._name;
    this._popupImageCaption.textContent = this._name;
  }
}

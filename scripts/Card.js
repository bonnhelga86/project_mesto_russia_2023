import { openPopup } from './index.js';

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  _likeCard() {
    this._cardElement.querySelector('.elements__like').classList.toggle('elements__like_type_active');
  }

  _deleteCard() {
    this._cardElement.querySelector('.elements__trash').closest('.elements__item').remove();
  }

  _renderPhotoPopup() {
    const popupImage = document.querySelector('.popup-image');
    const popupImagePhoto = document.querySelector('.popup-image__photo');

    popupImagePhoto.src = this._link;
    popupImagePhoto.alt = this._name;
    document.querySelector('.popup-image__caption').textContent = this._name;

    openPopup(popupImage);
  }

  _setEventListeners() {
    this._cardElement.querySelector('.elements__like').addEventListener('click', () => {
      this._likeCard();
    });

    this._cardElement.querySelector('.elements__trash').addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._renderPhotoPopup();
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.elements__photo');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardElement.querySelector('.elements__title').textContent = this._name;

    return this._cardElement;
  }
}

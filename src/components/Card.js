export class Card {
  constructor({ name, link, likes }, templateSelector, { handleCardClick, handleDeleteClick }) {
    this._name = name;
    this._link = link;
    this._likes = likes.length;
    this._templateSelector = templateSelector;
    this._openPopupWithImage = handleCardClick;
    this._openPopupForDelete = handleDeleteClick;
    this._popupImage = document.querySelector('.popup-image');
    this._popupImagePhoto = document.querySelector('.popup-image__photo');
    this._popupImageCaption = document.querySelector('.popup-image__caption');
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

  // _deleteCard() {
  //   this._cardElement.querySelector('.elements__trash').closest('.elements__item').remove();
  // }

  _setEventListeners() {
    this._cardElement.querySelector('.elements__like').addEventListener('click', () => {
      this._likeCard();
    });

    this._cardElement.querySelector('.elements__trash').addEventListener('click', () => {
      this._openPopupForDelete();
      // this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._openPopupWithImage(this._name, this._link);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.elements__photo');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardElement.querySelector('.elements__like-count').textContent = this._likes;
    this._cardElement.querySelector('.elements__title').textContent = this._name;

    return this._cardElement;
  }
}

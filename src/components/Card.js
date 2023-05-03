export class Card {
  constructor(item, templateSelector, { handleCardClick, handleLikeClick, handleDeleteClick }) {
    this._cardId = item._id;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes.length;
    this._isMyCard = item.isMyCard;
    this._isLike = item.isLike;
    this._templateSelector = templateSelector;
    this._openPopupWithImage = handleCardClick;
    this._likeCard = handleLikeClick;
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

  _setEventListeners() {
    this._cardElement.querySelector('.elements__like').addEventListener('click', (event) => {
      this._likeCard(event.target, this._cardId, this._isLike);
    });

    this._cardElement.querySelector('.elements__trash').addEventListener('click', (event) => {
      this._openPopupForDelete(event.target.closest('.elements__item'), this._cardId);
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

    this._isMyCard && this._cardElement.querySelector('.elements__trash').classList.add('elements__trash_show');
    this._isLike && this._cardElement.querySelector('.elements__like').classList.add('elements__like_type_active');

    return this._cardElement;
  }
}

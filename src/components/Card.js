export class Card {
  constructor(item, userId, templateSelector, { handleCardClick, handleLikeClick, handleDeleteClick }) {
    this._cardId = item._id;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._cardOwner = item.owner._id;
    this._myId = userId;
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

  _setDeleteIcon() {
    this._cardOwner === this._myId &&
    this._cardElement.querySelector('.elements__trash').classList.add('elements__trash_show');
  }

  _isLike = (likes) => {
    return likes.some(like => like._id === this._myId);
  }

  _setLikesCounter = (count) => {
    this._cardElement.querySelector('.elements__like-count').textContent = count;
  }

  setLikeStatus = (likes = this._likes) => {
    const likeElement = this._cardElement.querySelector('.elements__like');
    this._isLike(likes)
      ? likeElement.classList.add('elements__like_type_active')
      : likeElement.classList.remove('elements__like_type_active');

    this._setLikesCounter(likes.length);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.elements__photo');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardElement.querySelector('.elements__title').textContent = this._name;

    this._setDeleteIcon();
    this.setLikeStatus();

    return this._cardElement;
  }
}

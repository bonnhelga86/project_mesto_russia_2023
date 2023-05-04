export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
    this._myId = null;
  }

  // Работа с карточками
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(response => {
      if(!response.ok) return Promise.reject(`Ошибка: ${res.status}`);

      return response.json();
    })
    .then(cardsData => {
      return cardsData.map((card) => ({
        ...card,
        isMyCard: (card.owner._id === this._myId),
        isLike: (card.likes.some(like => like._id === this._myId))
      }));
    })
    .catch(error => {
      console.error(error);
    })
  }

  saveCard(name, link, popup) {
    const popupButton = popup.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';

    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
    .then(response => {
      if(!response.ok) return Promise.reject(`Ошибка: ${res.status}`);

      return response.json();
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      popupButton.textContent = 'Создать';
    })
  }

  likeCard(cardId, likeAction) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: likeAction,
      headers: {
        authorization: this._authorization
      }
    })
    .then(response => {
      if(!response.ok) return Promise.reject(`Ошибка: ${res.status}`);
      return response.json();
    })
    .then(cardData => {
      return cardData;
    })
    .catch(error => {
      console.error(error);
    })
  }

  deleteCard(elementForDelete, cardId) {
    fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(response => {
      if(!response.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        elementForDelete.remove();
      }
    })
    .catch(error => {
      console.error(error);
    })
  }

  // Работа с пользователем
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(response => {
      if(!response.ok) return Promise.reject(`Ошибка: ${res.status}`);

      return response.json();
    })
    .then(userData => {
      this._myId = userData._id;
      return userData;
    })
    .catch(error => {
      console.error(error);
    })
  }

  saveUserInfo(name, about, popup) {
    const popupButton = popup.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then(response => {
      if(!response.ok) return Promise.reject(`Ошибка: ${res.status}`);

      return response.json();
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      popupButton.textContent = 'Сохранить';
    })
  }

  editUserAvatar(avatar, popup) {

    console.log('Смена аватара', avatar, popup);
    const popupButton = popup.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    })
    .then(response => {
      if(!response.ok) return Promise.reject(`Ошибка: ${res.status}`);

      return response.json();
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      popupButton.textContent = 'Сохранить';
    })
  }

}
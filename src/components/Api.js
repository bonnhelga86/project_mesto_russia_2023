export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  // Работа с карточками
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(response => {
      if(!response.ok) throw new Error('Информация о карточках в данный момент недоступна');

      return response.json();
    })
    .then(cardsData => {
      return cardsData.map((card) => ({ ...card, isMyCard: (card.owner._id === this._myId) }));
    })
    .catch(error => {
      console.error(error);
    })
  }

  saveCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
  }

  likeCard(cardId) {
    console.log('Вы лайкнули карточку', cardId);

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then(response => {
      if(!response.ok) throw new Error('Не удалось поставить лайк');
      return response.json();
    })
    .then(cardData => {
      return cardData;
    })
    .catch(error => {
      console.error(error);
    })
  }

  dislikeCard() {
    console.log('Вы дизлайкнули карточку');
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
        throw new Error('Карточка не удалилась');
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
      if(!response.ok) throw new Error('Информация о пользователе в данный момент недоступна');

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

  saveUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then(response => {
      if(!response.ok) throw new Error('Обновление данных не удалось');

      return response.json();
    })
    .then(userData => {
      console.log(userData);
    })
    .catch(error => {
      console.error(error);
    })
  }

}

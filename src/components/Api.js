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
      // return cardsData.map((card) => {
      //   card.isMyCard = (card.owner._id === this._myId);
      //   return card;
      // });

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

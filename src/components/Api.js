export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // Работа с карточками
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    }).then(this._getResponseData);
  }

  saveCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    }).then(this._getResponseData);
  }

  likeCard(cardId, elementLikes) {
    const likeAction = elementLikes.classList.contains('elements__like_type_active') ? 'DELETE' : 'PUT';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: likeAction,
      headers: {
        authorization: this._authorization
      }
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(response => {
      if(!response.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return Promise.resolve();
      }
    })
  }

  // Работа с пользователем
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    }).then(this._getResponseData);
  }

  saveUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    }).then(this._getResponseData);
  }

  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    }).then(this._getResponseData);
  }
}

export class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-65/users/me', {
      headers: {
        authorization: '76bd6af4-1eb8-427e-97cd-2bc6cdc45941'
      }
    })
    .then(response => {
      if(!response.ok) throw new Error('Хьюстон, у нас проблемы!');

      return response.json();
    })
    .then(userData => {
      return userData;
    })
    .catch(error => {
      console.error(error);
    })
  }

  setUserAvatar(avatar, name) {
    this._avatar.src = avatar;
    this._avatar.alt = name;
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}

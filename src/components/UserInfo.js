export class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector, popupSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._form = document.querySelector(popupSelector).querySelector('.form');
  }

  getUserInfo() {
    return {'profile-name': this._name.textContent, 'profile-profession': this._about.textContent};
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.alt = name;
  }

  setInputValues = (values) => {
    Object.keys(values).forEach(key => {
      if(this._form[key]) this._form[key].value = values[key];
    })
  }

}

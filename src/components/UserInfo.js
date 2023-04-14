export class UserInfo {
  constructor({nameSelector, professionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
  }

  getUserInfo() {
    const info = {};
    info.name = this._name.textContent;
    info.profession = this._profession.textContent;
    return info;
  }

  setUserInfo(name, profession) {
    this._name.textContent = name;
    this._profession.textContent = profession;
  }
}

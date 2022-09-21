export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameNode = document.querySelector(userNameSelector);
    this._userJobNode = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    this._userName = this._userNameNode.textContent;
    this._userJob = this._userJobNode.textContent;
    this._userData = {
      name: this._userName,
      about: this._userJob,
    };

    return this._userData;
  }

  setUserInfo({ name, about }) {
    this._userNameNode.textContent = name;
    this._userJobNode.textContent = about;
  }
}

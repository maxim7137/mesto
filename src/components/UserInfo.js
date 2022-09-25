import { popupAvatarSelectors } from "../utils/constants.js";

export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameNode = document.querySelector(userNameSelector);
    this._userJobNode = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(popupAvatarSelectors.userAvatar);
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
    if (name) {
      this._userNameNode.textContent = name;
    }
    if (about) {
      this._userJobNode.textContent = about;
    }
  }

  setUserAvatar(link) {
    this._userAvatar.src = link;
  }
}

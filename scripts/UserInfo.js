import {
  root, selectors
} from "./constants.js";

export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
  }

  getUserInfo() {
    this._userName = root.querySelector(this._userNameSelector).textContent;
    this._userJob = root.querySelector(this._userJobSelector).textContent;
    this.userData = { name: this._userName, info: this._userJob };

    return this.userData;
  }

  setUserInfo() {
    this._profileName = root.querySelector(this._userNameSelector);
    this._profileCharacter = root.querySelector(this._userJobSelector);
    this._nameInput = root.querySelector(selectors.nameInput);
    this._jobInput = root.querySelector(selectors.jobInput);
    this._profileName.textContent = this._nameInput.value;
    this._profileCharacter.textContent = this._jobInput.value;
  }
}
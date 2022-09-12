const userSelectors = {
  nameInput: '.popup__input_user_name',
  jobInput: '.popup__input_user_character'
}

export default class UserInfo {
  constructor({
    userNameSelector,
    userJobSelector
  }) {
    this._userNameNode = document.querySelector(userNameSelector);
    this._userJobNode = document.querySelector(userJobSelector);

    this._nameInput = document.querySelector(userSelectors.nameInput);
    this._jobInput = document.querySelector(userSelectors.jobInput);
  }

  getUserInfo() {
    this._userName = this._userNameNode.textContent;
    this._userJob = this._userJobNode.textContent;
    this._userData = {
      name: this._userName,
      info: this._userJob
    };

    return this._userData;
  }

  setUserInfo(name, job) {

    this._userNameNode.textContent = name;
    this._userJobNode.textContent = job;
  }
}
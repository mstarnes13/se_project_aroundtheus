export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this.userDescriptionElement = document.querySelector(
      userDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this.userDescriptionElement.textContent
    };
  }

  setUserInfo({ title, description }) {
    this._userNameElement.textContent = title;
    this.userDescriptionElement.textContent = description;
  }
}

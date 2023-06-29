export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, avatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this.userDescriptionElement = document.querySelector(
      userDescriptionSelector
    );
    this._profileAvatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo({ title, description, avatar }) {
    this._userNameElement.textContent = title;
    this.userDescriptionElement.textContent = description;
    this._profileAvatarElement.src = avatar;
  }

  _setAvatarInfo(avatar) {
    this._profileAvatarElement.src = avatar;
  }
}

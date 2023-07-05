export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, avatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(
      userDescriptionSelector
    );
    this._profileAvatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    // console.log("getUserInfo: ", this.userDescriptionSelector);
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo({ title, description, avatar }) {
    this._userNameElement.textContent = title;
    this._userDescriptionElement.textContent = description;
    // this._profileAvatarElement.src = avatar;
  }

  setAvatarInfo(avatar) {
    this._profileAvatarElement.src = avatar;
  }
}

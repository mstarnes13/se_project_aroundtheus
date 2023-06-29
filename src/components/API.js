export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  /***************
   * GETCARDLIST *
   ***************/
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`).catch((err) => {
        console.error(err);
      });
    });
  }

  /***************
   * GETUSERINFO *
   ***************/
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`).catch((err) => {
        console.error(err);
      });
    });
  }

  /************
   * ADD CARD *
   ************/

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`).catch((err) => {
        console.error(err);
      });
    });
  }

  /********************
   * UPDATE USER INFO *
   ********************/
  updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`).catch((err) => {
        console.error(err);
      });
    });
  }

  updateUserProfile(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`).catch((err) => {
        console.error(err);
      });
    });
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`).catch((err) => {
        console.error(err); // log the error to the console
      });
    });
  }

  getLikesCount(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/cards/likes/${cardId}`,
      {
        method: "GET",
        headers: {
          authorization: this._authToken,
          "Content-Type": "application/json",
        },
      }
    );
  }

  likeCard(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: {
          authorization: this._authToken,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`).catch((err) => {
        console.error(err);
      });
    });
  }

  unLikeCard(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._authToken,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`).catch((err) => {
        console.error(err);
      });
    });
  }
}

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
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
      .catch((err) => {
        console.error(err);
    
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
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
      .catch((err) => {
        console.error(err);
      
    });
  }

  // POST

  addCard({ name, link }) {
    return fetch (`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
      .catch((err) => {
        console.error(err);
      
    });
  }

  //   const api = new Api({
  //     baseUrl: "https://around.nomoreparties.co/v1/group-42",
  //     headers: {
  //       authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
  //       "Content-Type": "application/json"
  //     }
  //   });
}

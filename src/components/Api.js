export default class Api {
  #isServerOk(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  constructor() {
    this._token = "eacdcad8-b7be-4b95-a68d-d5be8d193107";
    this._baseUrl = "https://mesto.nomoreparties.co/v1/cohort-51";
  }

  _isServerOk = (res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getInitialUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
<<<<<<< HEAD
    }).then(this.#isServerOk);
=======
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
>>>>>>> ed6aa5c7fe0ae53b2741bc93c1980c871f1abb5c
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
<<<<<<< HEAD
    }).then(this.#isServerOk);
=======
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
>>>>>>> ed6aa5c7fe0ae53b2741bc93c1980c871f1abb5c
  }

  setUser({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
<<<<<<< HEAD
    }).then(this.#isServerOk);
=======
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
>>>>>>> ed6aa5c7fe0ae53b2741bc93c1980c871f1abb5c
  }

  setAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
<<<<<<< HEAD
    }).then(this.#isServerOk);
=======
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
>>>>>>> ed6aa5c7fe0ae53b2741bc93c1980c871f1abb5c
  }

  setCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
<<<<<<< HEAD
    }).then(this.#isServerOk);
=======
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
>>>>>>> ed6aa5c7fe0ae53b2741bc93c1980c871f1abb5c
  }

  delCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
<<<<<<< HEAD
    }).then(this.#isServerOk);
=======
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
>>>>>>> ed6aa5c7fe0ae53b2741bc93c1980c871f1abb5c
  }

  likeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
<<<<<<< HEAD
    }).then(this.#isServerOk);
=======
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
>>>>>>> ed6aa5c7fe0ae53b2741bc93c1980c871f1abb5c
  }

  dislikeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
<<<<<<< HEAD
    }).then(this.#isServerOk);
=======
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
>>>>>>> ed6aa5c7fe0ae53b2741bc93c1980c871f1abb5c
  }
}

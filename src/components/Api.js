export class Api {
    constructor(adress, token) {
        this._adress = adress;
        this._token = token;
    }

    //забираем карточки
    getCards() {
        return fetch(`${this._adress}/cards/`, {
                headers: {
                    authorization: this._token,
                }
            })
            .then(result => result.json())
    }

    //берем данные профиля
    getProfileInfo() {
        return fetch(`${this._adress}/users/me`, {
                headers: {
                    authorization: this._token,
                }
            })
            .then(result => result.json())
    }

    //редактируем данные профиля
    editProfileInfo(profileName, profileDescription) {
        return fetch(`${this._adress}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: profileName,
                    about: profileDescription,
                    // avatar: avatar
                })
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                } else {
                    return Promise.reject('Ошибка')
                }
            })
    }

    editAvatarInfo(avatar) {
        return fetch(`${this._adress}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                } else {
                    return Promise.reject('Ошибка')
                }
            })
    }

    //отправляем карточку
    postCard({
        cardName,
        cardLink
    }) {
        return fetch(`${this._adress}/cards`, {
                method: 'POST',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: cardName,
                    link: cardLink
                })
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                } else {
                    return Promise.reject('Ошибка')
                }
            })
    }

    deleteCard(id) {
        return fetch(`${this._adress}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        })
        .then(result => result.json())
    }

    sendLike(id) {
        return fetch(`${this._adress}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
            },
        })
        .then((res) => {
        if (res.ok) {
            return res.json();
        }
        })
    }

    deleteLike(id) {
        return fetch(`${this._adress}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(result => {result.json()})
    }
}
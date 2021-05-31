export class Cards {
    constructor(cardData, cardSelector, handleCardClick, deleteCardClick) {
        this._name = cardData.name;
        this._image = cardData.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._counterSpan = cardData.likes.length;
        this._ownerId = cardData.owner._id;
        this._cardId = cardData._id;
        this._likes = cardData.likes._id;
        this._deleteCardClick = deleteCardClick // Открывавет попап
    }

    // Достаем разметку из template
    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content;
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    // putLike() {
    //     fetch (`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${this._cardId}`, {
    //         method: 'PUT',
    //             headers: {
    //                 authorization: '0ee77e54-461c-46fa-a82e-c4309127089b'
    //             }
    //     }).then(result => result.json);
    // }

    // deleteLike() {
    //     fetch (`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${this._cardId}`, {
    //         method: 'DELETE',
    //             headers: {
    //                 authorization: '0ee77e54-461c-46fa-a82e-c4309127089b'
    //             }
    //     }).then(result => result.json);
    // }

    // Лайк
    _cardLike() {
        const like = this._element.querySelector('.element__like');
        like.classList.toggle('element__like_active');

        // if (like.classList.contains('element__like_active')) {
        //     this._counterSpan += 1;
        //     this.putLike();
        // } else {
        //     this._counterSpan -= 1;
        //     this.deleteLike();
        // }
        // for (let i = 0; i < 1; i++) {
        if (this._likes = this._ownerId) {
            this._counterSpan -= 1;
            this.putLike();
        } else if (this._likes = this._ownerId) {
            this._counterSpan += 1;
            this.deleteLike();
        } 
    // }
            
        

        // } else {
        //     this._counterSpan += 1;
        //     this.deleteLike();
        // }
        this.getCounts()
    }

    //скрываем кнопки удаления 
    // _hideDeleteBtn() {
    //     if (this._ownerId === "ad2870556030e9d944e8820b") {
    //         this._element.querySelector('.element__delete-btn').classList.add('element__delete-btn_inactive');
    //     } else {
    //         this._element.querySelector('.element__delete-btn').classList.remove('element__delete-btn_inactive');
    //     }
    // }

    _hideDeleteBtn() {
        if (this._ownerId !== "ad2870556030e9d944e8820b") {
            this._element.querySelector('.element__delete-btn').classList.add('element__delete-btn_inactive');
        } else {
            this._element.querySelector('.element__delete-btn').classList.remove('element__delete-btn_inactive');
        }
    }

    getCounts() {
        this._element.querySelector('.element__like-counter').textContent = this._counterSpan
    }

    removeCard() {
        this._element.remove();
    }
    
    // Удаление карточки
    // _removeCard() {
    //     this._element.remove();
    //     fetch (`https://mesto.nomoreparties.co/v1/cohort-24/cards/${this._cardId}`, {
    //         method: 'DELETE',
    //             headers: {
    //                 authorization: '0ee77e54-461c-46fa-a82e-c4309127089b'
    //             }
    //     }).then(result => result.json);
    // }

    // Слушатели лайк, удаление, открытие попапа
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._cardLike();
                })
        this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
                this._deleteCardClick(this._cardId, this._element)
            })
            
            
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(idCard, cardContainer);
        })
    }

    // Создаем карточку
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this.getCounts();
        this._hideDeleteBtn();
        const elementImage = this._element.querySelector('.element__image');
        elementImage.src = this._image;
        elementImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element;
    }
}
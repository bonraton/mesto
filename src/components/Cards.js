export class Cards {
    constructor(cardData, cardSelector, handleCardClick, deleteCardClick, sendLike, deleteLike) {
        this._name = cardData.name;
        this._image = cardData.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._counterSpan = cardData.likes.length;
        this._ownerId = cardData.owner._id;
        this._cardId = cardData._id;
        this._likesId = cardData.likes;
        this._deleteCardClick = deleteCardClick // Открывавет попап
        this._sendLike = sendLike;
        this._deleteLike = deleteLike;
    }

    // Достаем разметку из template
    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content;
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    // Лайк
    _cardLike() {
        const like = this._element.querySelector('.element__like');

            this._sendLike(this._ownerId)
            this.getCounts();


        like.classList.toggle('element__like_active');
    }

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

    // Слушатели лайк, удаление, открытие попапа
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._cardLike();
                })
        this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
                this._deleteCardClick(this)
            })
            
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick();
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
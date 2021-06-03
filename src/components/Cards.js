export class Cards {
    constructor(cardData, cardSelector, handleCardClick, deleteCardClick, addLike, removeLike) {
        this._name = cardData.name; 
        this._image = cardData.link; 
        this._cardSelector = cardSelector; 
        this._handleCardClick = handleCardClick;
        this._counterSpan = cardData.likes.length;
        this._ownerId = cardData.owner._id;
        this._cardId = cardData._id;
        this._likes = cardData.likes;
        this._deleteCardClick = deleteCardClick // Открывавет попап
        this._addLike = addLike;
        this._removeLike = removeLike;
    }

    // Достаем разметку из template
    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content;
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    // переключатель состояния лайка
    _cardLikeToggle() {
        const like = this._element.querySelector('.element__like');
        like.classList.toggle('element__like_active');
    }

    //проверяем наличие моего лайка в карточке
    _hasLikedByMe() {
        return this._likes.some((item) => {
            return (item._id === "ad2870556030e9d944e8820b")
        })
    }


    _cardLikeHandler() {
        if (this._hasLikedByMe()) {
            this._addLike(this)
            this._cardLikeToggle()
            // this.countLikes();
        } else {
            this._removeLike(this)
            this._cardLikeToggle();
            // this.countLikes();
        }
    }


    
    _hideDeleteBtn() {
        if (this._ownerId !== "ad2870556030e9d944e8820b") {
            this._element.querySelector('.element__delete-btn').classList.add('element__delete-btn_inactive');
        } else {
            this._element.querySelector('.element__delete-btn').classList.remove('element__delete-btn_inactive');
        }
    }

    countLikes() {
        this._element.querySelector('.element__like-counter').textContent = this._counterSpan;
    }

    removeCard() {
        this._element.remove();
    }

    // Слушатели лайк, удаление, открытие попапа
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._cardLikeHandler()
                })
        this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
                this._deleteCardClick(this)
            })
            
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._image, this._name);
        })
    }

    // Создаем карточку
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this.countLikes();
        this._hideDeleteBtn();
        const elementImage = this._element.querySelector('.element__image');
        elementImage.src = this._image;
        elementImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element;
    }
}
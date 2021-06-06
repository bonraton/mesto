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
        this._deleteCardClick = deleteCardClick
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
    cardLikeToggle() {
        const like = this._element.querySelector('.element__like');
        like.classList.toggle('element__like_active');
    }

    //проверяем наличие моего лайка в карточке
    hasLikedByMe() {
        return this._likes.some((item) => {
            return (item._id === "ad2870556030e9d944e8820b")
        })
    }

    // отправляем/удаляем лайк с сервера
    _cardLikeHandler() {
        if (this._element.querySelector('.element__like_active')) {
            this._removeLike(this)
        } else {
            this._addLike(this)
        }
    }
    //отрисовка лайков при загрузке страницы
    getMineLikes() {
        if (this.hasLikedByMe()) {
            this._element.querySelector('.element__like').classList.add('element__like_active')
        } else {
            this._element.querySelector('.element__like').classList.remove('element__like_active')
        }
    }

    // отобразить кнопку удаления при создании новой карточки
    showDeleteBtn() {
        this._element.querySelector('.element__delete-btn').classList.remove('element__delete-btn_inactive');
    }

    // прячем кнопки удаления на карточках
    _hideDeleteBtn(id) {
        if (this._ownerId !== "ad2870556030e9d944e8820b") {
            this._element.querySelector('.element__delete-btn').classList.add('element__delete-btn_inactive');
        }
    }

    // отрисовка кол-ва лайков, +1, -1 к счетчику
    countLikes() {
        this._element.querySelector('.element__like-counter').textContent = this._counterSpan;
    }

    addOneLike() {
        this._element.querySelector('.element__like-counter').textContent  = this._counterSpan += 1
    }

    removeOneLike() {
        this._element.querySelector('.element__like-counter').textContent = this._counterSpan -= 1
    }

    //удаление карточки
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
        this._element.querySelector('.element__title').textContent = this._name;
        const elementImage = this._element.querySelector('.element__image');
        elementImage.src = this._image;
        elementImage.alt = this._name;
        this.getMineLikes()
        this._setEventListeners();
        this.countLikes();
        this._hideDeleteBtn();
        return this._element;
    }
}
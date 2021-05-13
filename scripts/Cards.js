import {openPopup} from './index.js'
export class Cards {
    constructor(cardData, cardSelector) {
        this._name = cardData.name;
        this._image = cardData.link
        this._cardSelector = cardSelector;
    }

    // Достаем разметку из template
    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content;
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    // Лайк
    _cardLike() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active')
    }

    // Превью карточки
    _previewCard() {
        const largeCard = document.querySelector('.popup__image');
        largeCard.src = this._image;
        largeCard.alt = this._name;
        openPopup(popupLargeCard);
    }

    // Удаление карточки
    _removeCard() {
        this._element.remove();
    }

    // Слушатели лайк, удаление, открытие попапа
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._cardLike();
        })
        this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
            this._removeCard();
        })

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._previewCard();
        })
    }

    // Создаем карточку
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').alt = this._name;
        return this._element;
    }
}
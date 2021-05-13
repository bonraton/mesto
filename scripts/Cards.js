import  {openPopup} from './index.js'
export class Cards {
    constructor(cardData, cardSelector) {
        this._name = cardData.name;
        this._image = cardData.link
        this._cardSelector = cardSelector;
    }

    _previewCard() {
        const largeCard = document.querySelector('.popup__image');
        largeCard.src = this._image;
        largeCard.alt = this._name;
        openPopup(popupLargeCard);
    }

    getCard () {
        const cardTemplate = document.querySelector(this._cardSelector).content;
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        const likeBtn = cardElement.querySelector('.element__like');
        const deleteBtn = cardElement.querySelector('.element__delete-btn');
        const cardImage = cardElement.querySelector('.element__image');
        const cardTitle = cardElement.querySelector('.element__title');

        cardImage.src = this._image;
        cardTitle.textContent = this._name;
        cardImage.alt = this._name;

        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('element__like_active');
        })
        deleteBtn.addEventListener('click', () => {
            cardElement.remove();
        })

        cardImage.addEventListener('click', () => {
            this._previewCard();
        })

        return cardElement
    }
}
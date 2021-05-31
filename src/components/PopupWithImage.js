import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCardImage = this._popup.querySelector('.popup__image');
        this._popupDescription = this._popup.querySelector('.popup__description');
    }

    open(title, link) {
        super.open();
        this._popupCardImage.src = link;
        this._popupCardImage.alt = title;
    }
}
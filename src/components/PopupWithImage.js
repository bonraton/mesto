import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(title, link) {
        super.open();
        this._popup.querySelector('.popup__description').textContent = title
        this._popup.querySelector('.popup__image').src = link
    }
}
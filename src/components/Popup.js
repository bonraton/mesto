export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_visible');
        document.addEventListener('keyup', this._handleEscClose)
    }

    close() {
        this._popup.classList.remove('popup_visible')
        document.removeEventListener('keyup', this._handleEscClose)
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close-btn').addEventListener('click', () => {
            this.close();
        })
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === this._popup) {
                this.close();
            }
        })
    }
}
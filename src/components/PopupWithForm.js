import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHanlder) {
        super(popupSelector);
        this._submitHandler = submitHanlder;
    }

    _getInputValues() {
        const values = {}
        const inputs = Array.from(this._popup.querySelectorAll('.popup-form__input'));
        inputs.forEach(input => {
            values[input.name] = input.value
        })
        return values
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form = this._popup.querySelector('.popup-form');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
            this.close();
        })
    }

    close() {
        super.close();
        this._popup.querySelector('.popup-form').reset();
    }
}
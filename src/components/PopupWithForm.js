import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHanlder) {
        super(popupSelector);
        this._submitHandler = submitHanlder;
        this._inputs = Array.from(this._popup.querySelectorAll('.popup-form__input'))
        this._form = this._popup.querySelector('.popup-form');
    }

    _getInputValues() {
        const values = {}
        this._inputs.forEach(input => {
            values[input.name] = input.value
        })
        return values
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
            this.close();
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}
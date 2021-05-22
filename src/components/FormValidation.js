export class FormValidation {
    constructor(objectConfig, formElement) {
        this._objectConfig = objectConfig;
        this._formElement = formElement;
    }

    //показать ошибку
    _showInputError(inputElement, errorMessage) {
        const formSectionElement = inputElement.closest(this._objectConfig.formSection);
        const errorElement = formSectionElement.querySelector(this._objectConfig.formError);
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._objectConfig.errorActiveClass);
    }

    //убрать ошибку
    _hideInputError(inputElement) {
        const formSectionElement = inputElement.closest(this._objectConfig.formSection);
        const errorElement = formSectionElement.querySelector(this._objectConfig.formError);
        errorElement.textContent = ''
        errorElement.classList.remove(this._objectConfig.errorActiveClass);
    }

    //Валидация формы
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // кнопка неактивна
    _desactivateButton(buttonElement) {
        buttonElement.disabled = true;
        buttonElement.classList.add(this._objectConfig.submitBtnInactive);
    }

    //кнопка активна
    _activateButton(buttonElement) {
        buttonElement.classList.remove(this._objectConfig.submitBtnInactive);
        buttonElement.disabled = false;
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // переключатель активности кнопки
    _toggleButtonSlate(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._desactivateButton(buttonElement);
        } else {
            this._activateButton(buttonElement)
        }
    }

    //слушатели форм
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._objectConfig.inputSelector))
        const buttonElement = this._formElement.querySelector(this._objectConfig.submitBtnSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonSlate(inputList, buttonElement);
            })
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', evt => evt.preventDefault())
        this._setEventListeners();
    };
}
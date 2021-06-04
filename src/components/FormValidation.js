export class FormValidation {
    constructor(objectConfig, formElement) {
        this._objectConfig = objectConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._objectConfig.inputSelector));
        this._spanList = Array.from(this._formElement.querySelectorAll(this._objectConfig.formError));
        this._buttonElement = this._formElement.querySelector(this._objectConfig.submitBtnSelector);
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

    //удаление спанов с ошибками
    clearAllspanErrors() {
        this._spanList.forEach(span => {
            span.classList.remove(this._objectConfig.errorActiveClass);
        })
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    //отключение кнопки
    disableSubmitButton() {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._objectConfig.submitBtnInactive);
    }

    //включение кнопки
    enableSubmitButton() {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._objectConfig.submitBtnInactive);
    }

    //переключатель состояния кнопки
    _toggleButtonSlate() {
        if (this._hasInvalidInput(this._inputList)) {
            this.disableSubmitButton()
        } else {
            this.enableSubmitButton();
        }
    }

    //слушатели форм
    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonSlate(this._inputList, this._buttonElement);
            })
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', evt => evt.preventDefault())
        this._setEventListeners();
    };
}
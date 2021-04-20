const showInputError = (inputElement, errorMessage) => {
    
const errorElement = inputElement.closest
    ('.popup-form__section').querySelector('.popup-form__error');
errorElement.textContent = errorMessage;
errorElement.classList.add('popup-form__error_active')
}

const hideInputError = (inputElement) => {
    const errorElement = inputElement.closest
    ('.popup-form__section').querySelector('.popup-form__error');

    errorElement.textContent = '';
    errorElement.classList.remove('popup-form__error_active')
}

const toggleButtonState = (inputList, buttonElement) => {
    const hasNotValidInput = inputList.some( 
        (inputElement) => !inputElement.validity.valid
    );

if (hasNotValidInput) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup-form__submit_inactive');
} else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup-form__submit_inactive');
}
}

const chekInputValidity  = (inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;

if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(inputElement, errorMessage)
} else {
    hideInputError(inputElement)
}
}

const setEventListeners = (formElement) => {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll('.popup-form__input'))
    const buttonElement = formElement.querySelector('.popup-form__submit');

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (event) => {
            chekInputValidity(inputElement);
            toggleButtonState(inputList, buttonElement);
        })
    })
}

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup-form'));

    formList.forEach(setEventListeners)
}

enableValidation();
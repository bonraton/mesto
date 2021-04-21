const showInputError = (inputElement, errorMessage) => {
    const formSectionElement = inputElement.closest(".popup-form__section");
    const errorElement = formSectionElement.querySelector(".popup-form__error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup-form__error_active')
}

const hideInputError = (inputElement) => {
    const formSectionElement = inputElement.closest(".popup-form__section");
    const errorElement = formSectionElement.querySelector(".popup-form__error");
    errorElement.textContent = '';
    errorElement.classList.remove('popup-form__error_active')
}

const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(inputElement, errorMessage)
    } else {
        hideInputError(inputElement)
    }
}

const desactivateButton = (buttonElement, submitBtnInactive) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(submitBtnInactive);;
}

const toggleButtonState = (inputList, buttonElement, submitBtnInactive) => {
    const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
    const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

    if (hasNotValidInput) {
        desactivateButton(buttonElement);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(submitBtnInactive);
    }
}

const setEventListeners = (formElement, inputSelector, submitBtnSelector) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector))
    const buttonElement = formElement.querySelector(submitBtnSelector);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        desactivateButton(buttonElement);
    };

    desactivateButton(buttonElement);

    formElement.addEventListener("submit", handleFormSubmit);

    const inputListIterator = (inputElement) => {
        const handleInput = () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        };

        inputElement.addEventListener("input", handleInput);
    };

    inputList.forEach(inputListIterator);

    toggleButtonState(inputList, buttonElement, submitBtnSelector);
}

const enableValidation = ({
    formSelector,
    inputSelector,
    submitBtnInactive,
    submitBtnSelector,
}) => {
    const formElements = document.querySelectorAll(formSelector);
    const formList = Array.from(formElements);
    formList.forEach((formElement) => {
        setEventListeners(formElement, inputSelector, submitBtnSelector, submitBtnInactive,);
    });
};

enableValidation({
    formSelector: ".popup-form",
    inputSelector: ".popup-form__input",
    submitBtnInactive: ".popup-form__submit_inactive",
    submitBtnSelector: ".popup-form__submit",
});
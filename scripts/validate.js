const showInputError = (inputElement, errorMessage, objectConfig) => {
    const formSectionElement = inputElement.closest(objectConfig.formSection);
    const errorElement = formSectionElement.querySelector(objectConfig.formError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objectConfig.errorActiveClass)
}

const hideInputError = (inputElement) => {
    const formSectionElement = inputElement.closest(objectConfig.formSection);
    const errorElement = formSectionElement.querySelector(objectConfig.formError);
    errorElement.textContent = '';
    errorElement.classList.remove(objectConfig.errorActiveClass)
}

const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(inputElement, errorMessage, objectConfig)
    } else {
        hideInputError(inputElement, objectConfig)
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
        buttonElement.classList.remove(objectConfig.submitBtnInactive);
    }
}

const setEventListeners = (formElement, objectConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(objectConfig.inputSelector))
    const buttonElement = formElement.querySelector(objectConfig.submitBtnSelector);
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

    toggleButtonState(inputList, buttonElement, objectConfig.submitBtnSelector);
}

const enableValidation = (objectConfig) => {
    const formElements = document.querySelectorAll(objectConfig.formSelector);
    const formList = Array.from(formElements);
    formList.forEach((formElement) => {
        setEventListeners(formElement, objectConfig);
    });
};

const objectConfig = {
    formSelector: ".popup-form",
    inputSelector: ".popup-form__input",
    submitBtnInactive: ".popup-form__submit_inactive",
    submitBtnSelector: ".popup-form__submit",
    formSection: ".popup-form__section",
    formError: ".popup-form__error",
    errorActiveClass: 'popup-form__error_active'
}

enableValidation(objectConfig);
// переменные для попапа и кнопок
let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile-info__edit-button');
let popupCloseButton = popup.querySelector('.popup-form__close-button');
let popupSubmitButton = popup.querySelector('.popup-form__submit');


//функции для добавления и удаленния класса в попап.
function popupVisible() {
    popup.classList.add('popup_visible');
}

function popupHidden() {
    popup.classList.remove('popup_visible');
}

// вызов функциий  по клику
profileEditButton.addEventListener('click', popupVisible);
popupCloseButton.addEventListener('click', popupHidden);

// Переменные полей ввода
let profileNameInput = document.getElementById('profileNameInput');
let profileDescriptionInput = document.getElementById('profileDescriptionInput');

// Переменные для сохранения введенных данных
let profileName = profile.querySelector('.profile-info__name');
let profileDescription = profile.querySelector('.profile-info__description');

//функция для сохранения введеных данных в профиль

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.innerText = profileNameInput.value;
    profileDescription.innerText = profileDescriptionInput.value;
    popup.classList.remove('popup_visible');
}

popupSubmitButton.addEventListener('click', formSubmitHandler);
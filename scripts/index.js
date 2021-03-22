// переменные для попапа и кнопок
let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');
let profileEditBtn = profile.querySelector('.profile__edit-btn');
let popupCloseBtn = popup.querySelector('.popup__close-btn');
let popupSubmitBtn = popup.querySelector('.popup-form__submit');

// Переменные полей ввода
let profileNameInput = popup.querySelector('.popup-form__input_name');
let profileDescriptionInput = popup.querySelector('.popup-form__input_description');


//функции для добавления и удаленния класса в попап.
function popupVisible() {
    popup.classList.add('popup_visible');
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

function popupHidden() {
    popup.classList.remove('popup_visible');
}

// вызов функциий  по клику
profileEditBtn.addEventListener('click', popupVisible);
popupCloseBtn.addEventListener('click', popupHidden);



// Переменные для сохранения введенных данных
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');

//функция для сохранения введеных данных в профиль

function submitData() {
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    submitData()
    popupHidden();
}

popupSubmitBtn.addEventListener('click', formSubmitHandler);
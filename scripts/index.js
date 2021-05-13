import {Cards} from './Cards.js';
import {FormValidation} from './FormValidation.js';


// Стартовые карточки
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

//Селекторы валидации
const objectConfig = {
    formSelector: ".popup-form",
    inputSelector: ".popup-form__input",
    submitBtnInactive: ".popup-form__submit_inactive",
    submitBtnSelector: ".popup-form__submit",
    formSection: ".popup-form__section",
    inputErrorClass: ".popup-form__error_type_",
    formError: ".popup-form__error",
    errorActiveClass: 'popup-form__error_active'
}


// переменные блоков
const profile = document.querySelector('.profile');
const cardsContainer = document.querySelector('.elements');

//переменные попапов
const popupsAll = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popupProfile');
const popupCards = document.querySelector('#popupCards');

//переменные кнопок
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const profileSubmitBtn = popupProfile.querySelector('.popup-form__submit');
const cardAddBtn = document.querySelector('.profile__add-btn')

// Переменные сохранения введенных данных
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

// Переменные полей ввода
const profileNameInput = popupProfile.querySelector('.popup-form__input_name');
const profileDescriptionInput = popupProfile.querySelector('.popup-form__input_description');
const cardInputLink = popupCards.querySelector('.popup-form__input_description');
const cardInputTitle = popupCards.querySelector('.popup-form__input_name');
const cardForm = popupCards.querySelector('.popup-form');
const profileForm = popupProfile.querySelector('.popup-form');

// Открытие попапа
export function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closePopupByEsc);
}

// закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', closePopupByEsc);
}

// закрытие попапа по оверлею
const closePopupOverlayByClick = (evt) => {
    const target = evt.target;
    const popup = target.closest('.popup')
    const closeButton = target.closest('.popup__close-btn');
    if (target === popup || target === closeButton) {
        closePopup(popup);
    }
}

//слушатели для всех попапов
popupsAll.forEach((item) => {
    item.addEventListener('click', closePopupOverlayByClick);
});

//закрытие попапа по Esc
const closePopupByEsc = (evt) => {
    const popup = document.querySelector('.popup_visible');
    const key = evt.key;
    if (key === 'Escape') {
        closePopup(popup);
    }
}

// функция отображения данных из профиля в инпуте
function transferProfileInputFormData() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

//открытие открытия попап профиля
profileEditBtn.addEventListener('click', function () {
    transferProfileInputFormData();
    openPopup(popupProfile);
    profileSubmitBtn.removeAttribute('disabled', true);
});

//открытия попап карточек
cardAddBtn.addEventListener('click', function () {
    openPopup(popupCards);
})

//функция для сохранения введеных данных в профиль
function submitData() {
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
}

//функция отмены действия
function submitProfileForm(evt) {
    evt.preventDefault();
    closePopup(popupProfile);
    submitData()
}

//слушатель формы профиля
profileForm.addEventListener('submit', submitProfileForm);

//перебор начальных карточек
initialCards.forEach((item) => {
    const card = new Cards(item, '.element-template');
    const cardElement = card.getCard();
    cardsContainer.prepend(cardElement);
})

// добавление новой карточки
cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const card = new Cards ({name: cardInputTitle.value, link: cardInputLink.value}, '.element-template');
    const cardElement = card.getCard();
    cardsContainer.prepend(cardElement);
    closePopup(popupCards);
    cardForm.reset();
})

// Валидация форм
const addCardFormValidator = new FormValidation(objectConfig, cardForm);
const addProfileFormValidator = new FormValidation(objectConfig, profileForm);
addCardFormValidator.enableValidation();
addProfileFormValidator.enableValidation();

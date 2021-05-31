// Стартовые карточки
export const initialCards = [{
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
export const objectConfig = {
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
export const cardsContainerSelector = '.elements';

//переменные кнопок
export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const cardAddBtn = document.querySelector('.profile__add-btn')
export const avatarEdit = document.querySelector('.profile__avatar-overlay');

// Переменные полей ввода
export const profileNameInput = popupProfile.querySelector('.popup-form__input_name');
export const profileDescriptionInput = popupProfile.querySelector('.popup-form__input_description');
export const cardInputLink = popupCards.querySelector('.popup-form__input_description');
export const cardInputTitle = popupCards.querySelector('.popup-form__input_name');
export const cardForm = popupCards.querySelector('.popup-form');
export const profileForm = popupProfile.querySelector('.popup-form');
export const avatarForm = popupAvatar.querySelector('.popup-form');
export const avatarInputLink = avatarForm.querySelector('.popup-form__input');

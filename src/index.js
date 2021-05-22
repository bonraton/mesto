import './pages/index.css'

// импорт классов
import {Cards} from './components/Cards.js';
import {FormValidation} from './components/FormValidation.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import {Section} from './components/Section.js';
import {UserInfo} from './components/UserInfo.js';

//импорт переменных
import {initialCards} from '../src/utils/constants/constants.js';
import {objectConfig} from '../src/utils/constants/constants.js';
import {cardForm} from '../src/utils/constants/constants.js';
import {profileForm} from '../src/utils/constants/constants.js';
import {profileEditBtn} from '../src/utils/constants/constants.js';
import {cardsContainerSelector} from '../src/utils/constants/constants.js';
import {cardAddBtn} from '../src/utils/constants/constants.js';
import {profileNameInput} from '../src/utils/constants/constants.js';
import {profileDescriptionInput} from '../src/utils/constants/constants.js';
import {cardInputTitle} from '../src/utils/constants/constants.js';
import {cardInputLink} from '../src/utils/constants/constants.js';

// Валидация форм
const addCardFormValidator = new FormValidation(objectConfig, cardForm);
const addProfileFormValidator = new FormValidation(objectConfig, profileForm);
addCardFormValidator.enableValidation();
addProfileFormValidator.enableValidation();

//данные профиля
const profileInfo = new UserInfo ('.profile__name', '.profile__description');
const profileSubmitHandler = () => {
    profileInfo.setUserInfo(profileNameInput, profileDescriptionInput);
}

// попап профиля
const addEditProfileForm = new PopupWithForm ('#popupProfile', profileSubmitHandler) 
    addEditProfileForm.setEventListeners();

// открытие попапа профиля
profileEditBtn.addEventListener('click', () => {
    addEditProfileForm.open();
    profileNameInput.value = profileInfo.getUserInfo().name;
    profileDescriptionInput.value = profileInfo.getUserInfo().description;
})

const previewCard = new PopupWithImage ('#popupLargeCard');
previewCard.setEventListeners();

const handleCardClick = (title, link) => {
    previewCard.open(title, link)
}

// перебор карточек
const cardSection = new Section ({
    items: initialCards,
    renderer: function (data) {
        const card = new Cards (data, '.element-template',
            handleCardClick)
        return card.generateCard();
    }
}, cardsContainerSelector);
cardSection.render();

//добавление новой карточки
const cardFormSubmitHandler = () => {
    const card = new Cards(
        {name: cardInputTitle.value,
        link: cardInputLink.value},
        '.element-template',
        handleCardClick)
    cardSection.addItem(card.generateCard());
}

// попап карточек
const addEditCardForm = new PopupWithForm ('#popupCards', cardFormSubmitHandler);
addEditCardForm.setEventListeners();

// открытие попапа карточек
cardAddBtn.addEventListener('click', () => {
    addEditCardForm.open();
})



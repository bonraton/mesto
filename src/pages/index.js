import './index.css'
// импорт классов
import {Cards} from '../components/Cards.js';
import {FormValidation} from '../components/FormValidation.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

//импорт переменных
import {objectConfig} from '../utils/constants/constants.js';
import {cardForm} from '../utils/constants/constants.js';
import {profileForm} from '../utils/constants/constants.js';
import {profileEditBtn} from '../utils/constants/constants.js';
import {cardsContainerSelector} from '../utils/constants/constants.js';
import {cardAddBtn} from '../utils/constants/constants.js';
import {profileNameInput} from '../utils/constants/constants.js';
import {profileDescriptionInput} from '../utils/constants/constants.js';
import {cardInputTitle} from '../utils/constants/constants.js';
import {cardInputLink} from '../utils/constants/constants.js';
import {avatarEdit} from '../utils/constants/constants.js';
import {avatarForm} from '../utils/constants/constants.js';
import {avatarInputLink} from '../utils/constants/constants.js';



// Валидация форм
const addCardFormValidator = new FormValidation(objectConfig, cardForm);
const addProfileFormValidator = new FormValidation(objectConfig, profileForm);
const addAvatarFormValidator = new FormValidation(objectConfig, avatarForm);
addAvatarFormValidator.enableValidation();
addCardFormValidator.enableValidation();
addProfileFormValidator.enableValidation();

// попап профиля
const addEditProfileForm = new PopupWithForm ('#popupProfile', () => {
    profileSubmitHandler();
});
    addEditProfileForm.setEventListeners();

    // попап карточек
const addEditCardForm = new PopupWithForm ('#popupCards', () => {
    cardFormSubmitHandler();
});
addEditCardForm.setEventListeners();

    // попап превью карточки
const previewCard = new PopupWithImage ('#popupLargeCard');

// попап аватара
const addEditAvatarForm = new PopupWithForm('#popupAvatar', () => {
    avatarSubmitHandler();
});
addEditAvatarForm.setEventListeners();

// Листнеры попапов
// открытие попапа профиля
profileEditBtn.addEventListener('click', () => {
    addProfileFormValidator.enableSubmitButton();
    const userData = profileInfo.getUserInfo();
    profileNameInput.value = userData.name;
    profileDescriptionInput.value = userData.description;
    addEditProfileForm.open();
    addProfileFormValidator.clearAllspanErrors();
})

// открытие попапа карточек
cardAddBtn.addEventListener('click', () => {
    addCardFormValidator.disableSubmitButton();
    addCardFormValidator.clearAllspanErrors();
    addEditCardForm.open();
});

// открытие попапа аватара
avatarEdit.addEventListener('click', () => {
    addEditAvatarForm.open();
    addAvatarFormValidator.clearAllspanErrors();
    addAvatarFormValidator.disableSubmitButton();
})

// открытие превью карточки
previewCard.setEventListeners();
const handleCardClick = (title, link) => {
    previewCard.open(title, link)
}


const cardSection = new Section ({
    renderer: 
    function (data) {
        const card = createCard(data);
        return card.generateCard();
    }
}, cardsContainerSelector);


function createCard (data) {
    const card = new Cards (data, '.element-template', handleCardClick, deleteCardClick(data._id))
    return card;
}

function deleteCardClick (data) {
    const deleteCardPopup = new PopupWithForm ('#popupDelete', () => {
        deleteCard()}) 
    deleteCardPopup.open();
    deleteCardPopup.setEventListeners();
    api.deleteCard(data._id)
}


//добавление новой карточки
const cardFormSubmitHandler = () => {
            const card = createCard({name: cardInputTitle.value, link: cardInputLink.value, likes: '', owner: ''});            
    cardSection.addItem(card.generateCard());
    api.postCard({cardName: cardInputTitle.value, cardLink: cardInputLink.value}).then(result => {
        cardSection.addItem(createCard(result))
    })
}

const api = new Api ('https://mesto.nomoreparties.co/v1/cohort-24', '0ee77e54-461c-46fa-a82e-c4309127089b')

//Cобираем данные профиля
    api.getProfileInfo()
    .then(result => {
        profileInfo.setUserInfo(result.name, result.about);
        profileInfo.setUserAvatar(result.avatar);
    })

// Собираем данные карточек
    api.getCards()
    .then((result => {
        cardSection.render(result)
        console.log(result)
    }))

// отправляем аватарку
function sendAvatar() {
    api.editAvatarInfo(avatarInputLink.value)
    .then(result => {
        return result
    })
}

// отправляем профиль
function editProfileServ() {
    api.editProfileInfo(profileNameInput.value, profileDescriptionInput.value)
    .then(result => {
        return result
    })
}

// обработчик профиля и аватарки
const profileInfo = new UserInfo ('.profile__name', '.profile__description', '.profile__avatar');
const profileSubmitHandler = () => {
    profileInfo.setUserInfo(profileNameInput.value, profileDescriptionInput.value);
    editProfileServ();
}
const avatarSubmitHandler = () => {
    profileInfo.setUserAvatar(avatarInputLink.value);
    sendAvatar();
}








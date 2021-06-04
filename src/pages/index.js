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

const previewCard = new PopupWithImage ('#popupLargeCard');
previewCard.setEventListeners();

function handleCardClick (name, image) {
    previewCard.open(name, image);
}


const cardSection = new Section ({
    renderer: 
    function (data) {
        const card = createCard(data);
        return card.generateCard()
    }
}, cardsContainerSelector);

// х
function createCard (data) {
    const card = new Cards (data, '.element-template', handleCardClick, deleteCardClick, addLike, removeLike)
    return card
};

let cardToDelete = null
function deleteCardClick (data) {
    cardToDelete = data
    const deleteCardPopup = new PopupWithForm ('#popupDelete', () => {
        deleteCard()})
    deleteCardPopup.open();
    deleteCardPopup.setEventListeners();
    api.deleteCard(data._cardId)
}

function deleteCard() {
    cardToDelete._element.remove();
}


const cardFormSubmitHandler = () => {
    const card = createCard({name: cardInputTitle.value, link: cardInputLink.value, likes: [], owner: ''});
api.postCard({cardName: cardInputTitle.value, cardLink: cardInputLink.value})
.then(result => {
cardSection.addItem(card.generateCard())
card._cardId = result._id
card._ownerId = 'ad2870556030e9d944e8820b'
console.log(card)
card.showhideBtn();
})
};

let like = null
function addLike (data) {
    like = data
    api.sendLike(data._cardId)
    .then(result => {
        console.log(result)
        like._element.querySelector('.element__like-counter').textContent = result.likes.length        // like._element.querySelector('.element__like-counter') =+ 1``
    })
}

const api = new Api ('https://mesto.nomoreparties.co/v1/cohort-24', '0ee77e54-461c-46fa-a82e-c4309127089b')


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


let dislike = null
function removeLike (data) {
    dislike = data
    api.removeLike(data._cardId)
    .then(result => {
        console.log('dislike')
        console.log(result.likes.length)
        dislike._element.querySelector('.element__like-counter').textContent = result.likes.length
    })
}

Promise.all([api.getProfileInfo(), api.getCards()])
.then(([userData, cards]) => {
    profileInfo.setUserInfo(userData.name, userData.about)
    profileInfo.setUserAvatar(userData.avatar)
    cardSection.render(cards)
})


//Cобираем данные профиля
    // api.getProfileInfo()
    // .then(result => {
    //     profileInfo.setUserInfo(result.name, result.about);
    //     profileInfo.setUserAvatar(result.avatar);
    // })

// Собираем данные карточек
    // api.getCards()
    // .then((result => {
    //     cardSection.render(result)
    //     console.log(result)
    // }))






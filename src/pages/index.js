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
const addEditProfileForm = new PopupWithForm('#popupProfile', () => {
    profileSubmitHandler();
});
addEditProfileForm.setEventListeners();

// попап карточек
const addEditCardForm = new PopupWithForm('#popupCards', () => {
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

// попап превью
const previewCard = new PopupWithImage('#popupLargeCard');
previewCard.setEventListeners();

// функция открытия превью карточки
function handleCardClick(name, image) {
    previewCard.open(name, image);
}

// класс Секции
const cardSection = new Section({
    renderer: function (data) {
        const card = createCard(data);
        return card.generateCard()
    }
}, cardsContainerSelector);

// функция создания карточки
function createCard(data) {
    const card = new Cards(data, '.element-template', handleCardClick, deleteCardClick, addLike, removeLike)
    return card
};

// попап удаления карточки
const deleteCardPopup = new PopupWithForm('#popupDelete', () => {
    deleteCard()
})
deleteCardPopup.setEventListeners();

//удаляем карточку, закрываем попап
function deleteCard() {
    cardToDelete.removeCard();
    deleteCardPopup.close()
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-24', '0ee77e54-461c-46fa-a82e-c4309127089b')

// отправляем аватар
function sendAvatar() {
    addEditAvatarForm.changeSubmitBtnCondition('Сохранение...');
    api.editAvatarInfo(avatarInputLink.value)
        .then(result => {
            return result
        })
        .catch(e => console.log('Ошибка при получении данных'))
        .finally(() => addEditAvatarForm.changeSubmitBtnCondition('Сохранить'))
}

// отправляем профиль
function editProfileServ() {
    addEditProfileForm.changeSubmitBtnCondition('Сохранение...');
    api.editProfileInfo(profileNameInput.value, profileDescriptionInput.value)
        .then(result => {
            return result
        })
        .catch(e => console.log('Ошибка при получении данных'))
        .finally(() => addEditProfileForm.changeSubmitBtnCondition('Сохранить'))
}

// отправляем карточку
const cardFormSubmitHandler = () => {
    const card = createCard({
        name: cardInputTitle.value,
        link: cardInputLink.value,
        likes: [],
        owner: ''
    });
    addEditCardForm.changeSubmitBtnCondition('Создание...')
    api.postCard({
            cardName: cardInputTitle.value,
            cardLink: cardInputLink.value
        })
        .then(result => {
            cardSection.addItem(card.generateCard())
            card._cardId = result._id
            card._ownerId = 'ad2870556030e9d944e8820b'
            card.showDeleteBtn();
            addEditCardForm.close();
        })
        .catch(e => console.log('Ошибка при получении данных'))
        .finally(() => addEditCardForm.changeSubmitBtnCondition('Создать'))
};

// удаляем карточку с сервера
let cardToDelete = null

function deleteCardClick(data) {
    cardToDelete = data
    api.deleteCard(data._cardId)
        .then(() => {
            deleteCardPopup.open()
        })
        .catch(e => console.log('Ошибка при получении данных'))
}

// обработчик профиля и аватарки
const profileInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
const profileSubmitHandler = () => {
    profileInfo.setUserInfo(profileNameInput.value, profileDescriptionInput.value);
    editProfileServ();
    addEditProfileForm.close();
}
const avatarSubmitHandler = () => {
    profileInfo.setUserAvatar(avatarInputLink.value);
    sendAvatar();
    addEditAvatarForm.close();
}

// удаляем лайк с сервера
let dislike = null

function removeLike(data) {
    dislike = data
    api.removeLike(data._cardId)
        .then(result => {
            dislike._element.querySelector('.element__like-counter').textContent = result.likes.length
        })
        .catch(e => console.log('Ошибка при получении данных'))
}

// отправляем лайк на сервер
let like = null

function addLike(data) {
    like = data
    api.sendLike(data._cardId)
        .then(result => {
            like._element.querySelector('.element__like-counter').textContent = result.likes.length
        })
        .catch(e => console.log('Ошибка при получении данных'))
}

Promise.all([api.getProfileInfo(), api.getCards()])
    .then(([userData, cards]) => {
        profileInfo.setUserInfo(userData.name, userData.about)
        profileInfo.setUserAvatar(userData.avatar)
        cardSection.render(cards)
    })
    .catch(e => console.log('Ошибка при получении данных'))
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
    const card = new Cards(data, '.element-template', userInfo, handleCardClick, deleteCardClick, addLike, removeLike);
    return card
};

// попап удаления карточки
const deleteCardPopup = new PopupWithForm('#popupDelete', () => {
    deleteCard()
})
deleteCardPopup.setEventListeners();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-24', '0ee77e54-461c-46fa-a82e-c4309127089b')

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
            card._ownerId = userInfo._id
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
    deleteCardPopup.open()
}

//удаляем карточку, закрываем попап
function deleteCard() {
    deleteCardPopup.changeSubmitBtnCondition('Удаление...')
    api.deleteCard(cardToDelete._cardId)
        .then(() => {
            cardToDelete.removeCard();
            deleteCardPopup.close()
        })
        .catch(e => console.log('Ошибка при получении данных'))
        .finally(() => deleteCardPopup.changeSubmitBtnCondition('Да'))
}

const profileInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

// отправляем данные профиля и обрабатываем их
function profileSubmitHandler() {
    addEditProfileForm.changeSubmitBtnCondition('Сохранение...');
    api.editProfileInfo(profileNameInput.value, profileDescriptionInput.value)
        .then(() => {
            profileInfo.setUserInfo(profileNameInput.value, profileDescriptionInput.value)
            addEditProfileForm.close()
        })
        .catch(e => console.log('Ошибка при получении данных'))
        .finally(() => addEditProfileForm.changeSubmitBtnCondition('Сохранить'))
}

// отправляем аватар на сервер и обрабатываем его
function avatarSubmitHandler() {
    addEditAvatarForm.changeSubmitBtnCondition('Сохранение...');
    api.editAvatarInfo(avatarInputLink.value)
        .then(() => {
            profileInfo.setUserAvatar(avatarInputLink.value)
            addEditAvatarForm.close()
        })
        .catch(e => console.log('Ошибка при получении данных'))
        .finally(() => addEditAvatarForm.changeSubmitBtnCondition('Сохранить'))
}

// отправляем лайк на сервер
let like = null

function addLike(data) {
    like = data
    api.sendLike(data._cardId)
        .then(() => {
            like.addOneLike()
            like.cardLikeToggle()
        })
        .catch(e => console.log('Ошибка при получении данных'))
}

// удаляем лайк с сервера
let dislike = null

function removeLike(data) {
    dislike = data
    api.removeLike(data._cardId)
        .then(() => {
            dislike.removeOneLike()
            dislike.cardLikeToggle()
        })
        .catch(e => console.log('Ошибка при получении данных'))
}

let userInfo = null
Promise.all([api.getProfileInfo(), api.getCards()])
    .then(([userData, cards]) => {
        userInfo = userData._id
        profileInfo.setUserInfo(userData.name, userData.about)
        profileInfo.setUserAvatar(userData.avatar)
        cardSection.render(cards)
    })
    .catch(e => console.log('Ошибка при получении данных'))
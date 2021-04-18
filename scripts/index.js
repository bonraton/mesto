// переменные блоков
const profile = document.querySelector('.profile');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
const largeCard = document.querySelector('.popup__image');

//переменные попапов
const popupProfile = document.querySelector('#popupProfile');
const popupCards = document.querySelector('#popupCards');
const popupLargeCard = document.querySelector('#popupLargeCard');

//переменные кнопок
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const profileCloseBtn = popupProfile.querySelector('.popup__close-btn');
const popupSubmitBtn = popupProfile.querySelector('.popup-form__submit');

const cardsSubmitBtn = popupCards.querySelector('.popup-form__submit');
const cardAddBtn = document.querySelector('.profile__add-btn')
const cardsCloseBtn = popupCards.querySelector('.popup__close-btn');
const previewCloseBtn = popupLargeCard.querySelector('.popup__close-btn');

// Переменные для сохранения введенных данных
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const cardInfo = document.querySelector('.popup__description');

// Переменные полей ввода
const profileNameInput = popupProfile.querySelector('.popup-form__input_name');
const profileDescriptionInput = popupProfile.querySelector('.popup-form__input_description');
const cardInputLink = popupCards.querySelector('.popup-form__input_description');
const cardInputTitle = popupCards.querySelector('.popup-form__input_name');
const cardForm = popupCards.querySelector('.popup-form');
const profileForm = popupProfile.querySelector('.popup-form');

//функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_visible');
}

//функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_visible');
}

// функция для отображения данных из профиля в инпуте
function transferProfileInputFormData() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

//открытие закрытие попап профиля
profileEditBtn.addEventListener('click', function () {
    transferProfileInputFormData();
    openPopup(popupProfile);
});

profileCloseBtn.addEventListener('click', function () {
    closePopup(popupProfile);
});

//открытие закрытие попап карточек
cardAddBtn.addEventListener('click', function () {
    openPopup(popupCards);
})

cardsCloseBtn.addEventListener('click', function () {
    closePopup(popupCards);
})

//функция для сохранения введеных данных в профиль
function submitData() {
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
}

//функция отмены действия
function submitProfileForm(evt) {
    evt.preventDefault();
    submitData()
    closePopup(popupProfile);
}

profileForm.addEventListener('submit', submitProfileForm);

// перебор массива для начальных карточек
initialCards.forEach(function (item) {
    const card = createCard(item);
    cardsContainer.prepend(card);
})

//функция создания карточки

function createCard(item) {
    const card = cardTemplate.cloneNode(true);
    const cardDeleteBtn = card.querySelector('.element__delete-btn')
    const cardTitle = card.querySelector('.element__title');
    const cardLikeBtn = card.querySelector('.element__like');
    const cardPrewiewImage = card.querySelector('.element__image');

    cardTitle.textContent = item.name;
    cardPrewiewImage.src = item.link;
    cardPrewiewImage.alt = item.name;
    cardDeleteBtn.addEventListener('click', deleteCard);
    cardLikeBtn.addEventListener('click', likeCard);
    cardPrewiewImage.addEventListener('click', previewCard)
    return card;
}

// функция создания новой карточки
function submitCardForm(evt) {
    evt.preventDefault();
    const card = createCard({
        name: cardInputTitle.value,
        link: cardInputLink.value
    })
    cardsContainer.prepend(card);
    closePopup(popupCards);
    cardForm.reset();
}

cardForm.addEventListener('submit', submitCardForm);

//функция открытия превью карточки
function previewCard(evt) {
    const target = evt.target
    openPopup(popupLargeCard);
    largeCard.src = target.src
    largeCard.alt = target.alt
    cardInfo.textContent = target.alt
}

// закрытие превью карточки
previewCloseBtn.addEventListener('click', function () {
    closePopup(popupLargeCard);
})

//функция удаления карточки

function deleteCard(event) {
    event.target.closest('.element').remove();
}

//функция лайка 

function likeCard(event) {
    event.target.classList.toggle('element__like_active');
}
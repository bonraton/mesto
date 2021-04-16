// переменные блоков
const profile = document.querySelector('.profile');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
const largeCard = document.querySelector('.popup__image');
const cardPrewiew = document.querySelector('.element__image');

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
function popupActive(popup) {
    popup.classList.add('popup_visible');
}

//функция закрытия попапа
function popupHidden(popup) {
    popup.classList.remove('popup_visible');
}

// функция для отображения данных из профиля в инпуте
function profileInputFormData() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

//открытие закрытие попап профиля
profileEditBtn.addEventListener('click', function () {
    profileInputFormData();
    popupActive(popupProfile);
});

profileCloseBtn.addEventListener('click', function () {
    popupHidden(popupProfile);
});

//открытие закрытие попап карточек
cardAddBtn.addEventListener('click', function () {
    popupActive(popupCards);
})

cardsCloseBtn.addEventListener('click', function () {
    popupHidden(popupCards);
})

//функция для сохранения введеных данных в профиль
function submitData() {
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
}

//функция отмены действия
function formSubmitHandler(evt) {
    evt.preventDefault();
    submitData()
    popupHidden(popupProfile);
}

profileForm.addEventListener('click', formSubmitHandler);

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
    console.log(cardPrewiewImage);

    cardPrewiewImage.addEventListener('click', function () {
        popupActive(popupLargeCard);
        largeCard.src = cardPrewiewImage.src;
        cardInfo.textContent = cardTitle.textContent;
    })

    previewCloseBtn.addEventListener('click', function () {
        popupHidden(popupLargeCard);
    })

    return card
}

//функция удаления карточки

function deleteCard(event) {
    event.target.closest('.element').remove();
}

//функция лайка 

function likeCard(event) {
    event.target.classList.toggle('element__like_active');
}

// функция создания новой карточки
function createNewCard() {
    const card = cardTemplate.cloneNode(true);
    const cardDeleteBtn = card.querySelector('.element__delete-btn');
    const cardLike = card.querySelector('.element__like');
    const cardImage = card.querySelector('.element__image');

    card.querySelector('.element__title').textContent = cardInputTitle.value;
    cardImage.src = cardInputLink.value;
    cardImage.alt = cardInputTitle.value;

    cardsContainer.prepend(card);

    cardLike.addEventListener('click', likeCard);
    cardDeleteBtn.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', function () {
        popupActive(popupLargeCard);
        largeCard.src = cardInputLink.value;
        cardInfo.textContent = cardInputTitle.value;
    })

    previewCloseBtn.addEventListener('click', function () {
        popupHidden(popupLargeCard);
    })
}


function cardSubmitForm(evt) {
    evt.preventDefault();
    createNewCard()
    popupHidden(popupCards);
    cardForm.reset();

}

cardForm.addEventListener('submit', cardSubmitForm);
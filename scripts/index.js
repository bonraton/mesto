// переменные блоков
const profile = document.querySelector('.profile');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
const LargeCard = document.querySelector('.popup__image');
const cardPrewiew = document.querySelector('.element__image');
const popupForm = document.querySelector('.popup__form');

//переменные попапов
const popup = document.querySelector('.popup');
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

popupSubmitBtn.addEventListener('click', formSubmitHandler);


// перебор массива для начальных карточек
initialCards.forEach(function (item) {
    const card = createCard(item);
    cardsContainer.prepend(card);
})

//функция создания карточки

function createCard(item) {
    const cardsTemplate = document.querySelector('.element-template').content
    const card = cardsTemplate.cloneNode(true);
    const cardElement = card.querySelector('.element')
    const cardDeleteBtn = card.querySelector('.element__delete-btn');
    const cardDescription = card.querySelector('.element__title')

    card.querySelector('.element__title').textContent = item.name;
    card.querySelector('.element__image').src = item.link;
    card.querySelector('.element__image').alt = item.name;

    //лайк
    const cardLike = card.querySelector('.element__like');
    cardLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    })

    // удалениt карточки
    function deleteCard() {
        cardElement.remove();
    }
    cardDeleteBtn.addEventListener('click', deleteCard);

    // попап
    const cardImage = card.querySelector('.element__image');
    cardImage.addEventListener('click', function () {
        popupActive(popupLargeCard);
        LargeCard.src = cardImage.src;
        cardInfo.textContent = cardDescription.textContent;
    })
    previewCloseBtn.addEventListener('click', function () {
        popupHidden(popupLargeCard);

    })

    return card;
}


// функция создания новой карточки
function createNewCard(evt) {
    evt.preventDefault();

    const card = cardTemplate.cloneNode(true);
    const cardElement = card.querySelector('.element');
    const cardDeleteBtn = card.querySelector('.element__delete-btn');
    const cardLike = card.querySelector('.element__like');
    const cardImage = card.querySelector('.element__image');

    card.querySelector('.element__title').textContent = cardInputTitle.value;
    card.querySelector('.element__image').src = cardInputLink.value;
    card.querySelector('.element__image').alt = cardInputTitle.value;

    cardsContainer.prepend(card);

    popupHidden(popupCards);
    popupCards.querySelector('.popup-form').reset();

    //лайк
    cardLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    })

    //попап

    cardImage.addEventListener('click', function () {
        popupActive(popupLargeCard);
        LargeCard.src = cardInputLink.value;
        cardInfo.textContent = cardInputTitle.value;
    })

    //удаление
    function deleteCard() {
        cardElement.remove();
    }
    cardDeleteBtn.addEventListener('click', deleteCard);

}

cardsSubmitBtn.addEventListener('click', createNewCard);
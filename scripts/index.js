// Элементы Profile
const popupProfile = document.querySelector('.popup-profile');
const formProfile = popupProfile.querySelector('.form');
const buttonOpenPopupProfile = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

// Элементы Card
const popupCard = document.querySelector('.popup-card');
const formCard = popupCard.querySelector('.form');
const buttonOpenPopupCard = document.querySelector('.profile__button');
const cardList = document.querySelector('.elements__list-item');
const cardTemplate = document.querySelector('#elements__template').content;

// Элементы Image
const popupImage = document.querySelector('.popup-image');
const popupImagePhoto = popupImage.querySelector('.popup-image__photo');
const popupImageCaption = popupImage.querySelector('.popup-image__caption');

// Список элементов для закрытия Popup
const popupCloseList = document.querySelectorAll('.popup__close');

// Функция открывания Popup
function openPopup(popup) {
  popup.classList.contains('popup_hidden') && popup.classList.remove('popup_hidden');
  popup.classList.add('popup_opened');
}

// Функция предзаполнения input в PopupProfile
function fillPopupProfileFields() {
  formProfile['profile-name'].value = profileName.textContent;
  formProfile['profile-profession'].value = profileProfession.textContent;
  openPopup(popupProfile);
}

// Функция закрывания Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция заполнения PopupImage
function renderPhotoPopup(card) {
  const { name, link } = card || {};
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

// Функция лайка карточек
function likesCards(card) {
  card.classList.toggle('elements__like_type_active');
}

// Функция удаления карточек
function deleteCards(element) {
  element.remove();
}

// Функция вставки карточки в разметку
function addCard(card) {
  cardList.prepend(card);
}

// Функция генерирования карточек
function createCard(card) {
  const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);

  const cardImage = cardItem.querySelector('.elements__photo');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardItem.querySelector('.elements__title').textContent = card.name;

  cardItem.querySelector('.elements__like').addEventListener('click', event => {
    event.stopPropagation();
    likesCards(event.target);
  });

  cardItem.querySelector('.elements__trash').addEventListener('click', event => {
    event.stopPropagation();
    deleteCards(event.target.closest('.elements__item'));
  });

  cardItem.addEventListener('click', () => renderPhotoPopup(card));

  return cardItem;
}

// Функция перебора массива с карточками и получения данных
function renderCards() {
  initialCards.forEach(cardData => {
    const card = createCard(cardData);
    addCard(card);
  });
}

// Функция при Submit Profile
function submitProfile(event) {
  event.preventDefault();
  profileName.textContent = formProfile['profile-name'].value;
  profileProfession.textContent = formProfile['profile-profession'].value;
  closePopup(popupProfile);
}

// Функция при Submit Card
function submitCard(event) {
  event.preventDefault();
  const cardData = {
      name: formCard['card-name'].value,
      link: formCard['card-link'].value
    };
  const card = createCard(cardData);
  addCard(card);
  closePopup(popupCard);
  formCard.reset();
  formCard.querySelector(`${configValidation.submitButtonSelector}`).disabled = true;
}

renderCards();

// Устанавливаются слушатели событий
buttonOpenPopupProfile.addEventListener('click', () => fillPopupProfileFields());
buttonOpenPopupCard.addEventListener('click', () => openPopup(popupCard));

popupCloseList.forEach(function(element) {
  element.addEventListener('click', event => closePopup(event.target.closest('.popup')));
});

formProfile.addEventListener('submit', submitProfile);
formCard.addEventListener('submit', submitCard);

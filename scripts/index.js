import { Card, addCard } from './Card.js'

// Все popup на странице
const popupList = document.querySelectorAll('.popup');

// Элементы Profile
const popupProfile = document.querySelector('.popup-profile');
const formProfile = popupProfile.querySelector('.form');
const submitButtonProfile = formProfile.querySelector('.popup__button');
const buttonOpenPopupProfile = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

// Элементы Card
const popupCard = document.querySelector('.popup-card');
const formCard = popupCard.querySelector('.form');
const submitButtonCard = formCard.querySelector('.popup__button');
const buttonOpenPopupCard = document.querySelector('.profile__button');

// Функция добавления слушателя на закрытие popup при нажатии Escape
const setEventListenerByEscape = event => {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// Функция открывания Popup
export const openPopup = popup => {
  document.addEventListener('keyup', setEventListenerByEscape);
  popup.classList.add('popup_opened');
}

// Функция предзаполнения input в PopupProfile и очистка валидации
const fillPopupProfileFields = () => {
  formProfile['profile-name'].value = profileName.textContent;
  formProfile['profile-profession'].value = profileProfession.textContent;
  removeValidationErrors(popupProfile);
  enableSubmitButton(submitButtonProfile);
  openPopup(popupProfile);
}

// Функция очистки полей формы добавления карточки
const clearPopupCardFields = () => {
  formCard.reset();
  removeValidationErrors(popupCard);
  disableSubmitButton(submitButtonCard);
  openPopup(popupCard);
}

// Функция закрывания Popup
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', setEventListenerByEscape);
}

// Функция при Submit Profile
const submitProfile = event => {
  event.preventDefault();
  profileName.textContent = formProfile['profile-name'].value;
  profileProfession.textContent = formProfile['profile-profession'].value;
  closePopup(popupProfile);
}

// Функция при Submit Card
const submitCard = event => {
  event.preventDefault();
  const card = new Card(formCard['card-name'].value, formCard['card-link'].value, '#elements__template');
  const cardElement = card.generateCard();
  addCard(cardElement);
  closePopup(popupCard);
}

// Слушатель на предзаполнение popup профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  fillPopupProfileFields();
});

// Слушатель на открытие popup
buttonOpenPopupCard.addEventListener('click', () => {
  clearPopupCardFields();
});

// Слушатель на закрытие popup по клику на крестик или overlay
popupList.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});

// Слушатели на события submit
formProfile.addEventListener('submit', submitProfile);
formCard.addEventListener('submit', submitCard);

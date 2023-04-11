import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';


const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  errorMessageSelector: '.form__text-error_type_',
  inputErrorClass: 'form__input_error',
  textErrorClass: 'form__text-error_visible'
}

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

// Создание экщемпляров класса валидации
const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(validationConfig, formCard);
formCardValidator.enableValidation();

const sectionCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item,
      '#elements__template',
      {
        rendererPopupImage: (name, link) => {
          const popupWithImage = new PopupWithImage('.popup-image', name, link);
          popupWithImage.open();
        }
      }
    );
    const cardElement = card.generateCard();
    return cardElement;
  }
}, '.elements__list-item');
sectionCard.renderItems();

// Функция предзаполнения input в PopupProfile и очистка валидации
const fillPopupProfileFields = () => {
  formProfile['profile-name'].value = profileName.textContent;
  formProfile['profile-profession'].value = profileProfession.textContent;

  formProfileValidator.removeValidationErrors();
  formProfileValidator.enableSubmitButton();
  const popupProfile = new Popup('.popup-profile');
  popupProfile.open();
}

// Функция очистки полей формы добавления карточки
const clearPopupCardFields = () => {
  formCard.reset();

  formCardValidator.removeValidationErrors();
  formCardValidator.disableSubmitButton();
  const popupCard = new Popup('.popup-card');
  popupCard.open();
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
  createCard(formCard['card-name'].value, formCard['card-link'].value, '#elements__template');
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

// Слушатели на события submit
formProfile.addEventListener('submit', submitProfile);
formCard.addEventListener('submit', submitCard);

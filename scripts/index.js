import { initialCards } from '../utils/initialCards.js';
import { validationConfig } from '../utils/validationConfig.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// Элементы Profile
const popupWithProfile = document.querySelector('.popup-profile');
const formProfile = popupWithProfile.querySelector('.form');
const buttonOpenPopupProfile = document.querySelector('.profile__edit');

// Элементы Card
const popupWithCard = document.querySelector('.popup-card');
const formCard = popupWithCard.querySelector('.form');
const buttonOpenPopupCard = document.querySelector('.profile__button');

// Создание экземпляров класса валидации
const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, formCard);
formCardValidator.enableValidation();

// Создание базовых 6 карточек
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

// Функция работы с формой для профиля
const fillPopupProfileFields = () => {
  const user = new UserInfo({
    nameSelector: '.profile__name',
    professionSelector: '.profile__profession'
  });
  const { name, profession } = user.getUserInfo();

  formProfile['profile-name'].value = name;
  formProfile['profile-profession'].value = profession;

  formProfileValidator.removeValidationErrors();
  formProfileValidator.enableSubmitButton();

  const popupProfile = new PopupWithForm(
    '.popup-profile',
    {
      callbackSubmit: (event, {'profile-name': name, 'profile-profession': profession}) => {
        event.preventDefault();
        user.setUserInfo(name, profession);
        popupProfile.close();
      }
    }
    );
  popupProfile.open();
}

// Функция работы с формой для карточки
const clearPopupCardFields = () => {
  formCardValidator.removeValidationErrors();
  formCardValidator.disableSubmitButton();

  const popupCard = new PopupWithForm(
    '.popup-card',
    {
      callbackSubmit: (event, dataCard) => {
        event.preventDefault();

        const sectionForCard = new Section ({
          items: [dataCard],
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
        sectionForCard.renderItems();

        popupCard.close();
      }
    }
    );
  popupCard.open();
}

// Слушатель на popup профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  fillPopupProfileFields();
});

// Слушатель на popup карточки
buttonOpenPopupCard.addEventListener('click', () => {
  clearPopupCardFields();
});

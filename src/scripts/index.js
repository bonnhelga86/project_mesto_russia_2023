import '../pages/index.css';
import {
  formProfile,
  buttonOpenPopupProfile,
  formCard,
  buttonOpenPopupCard
} from '../utils/constants.js';

import { initialCards } from '../utils/initialCards.js';
import { validationConfig } from '../utils/validationConfig.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// Создание экземпляров класса валидации
const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, formCard);
formCardValidator.enableValidation();

// Создание экземпляра класса Section
const sectionCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item,
      '#elements__template',
      {
        handleCardClick: (name, link) => {
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

// Создание экземпляра класса User
const user = new UserInfo({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession'
});

// Создание экземпляра класса PopupWithForm для профиля
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

// Создание экземпляра класса PopupWithForm для карточки
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
              handleCardClick: (name, link) => {
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

// Функция работы с формой для профиля
const fillPopupProfileFields = () => {
  const { name, profession } = user.getUserInfo();

  formProfile['profile-name'].value = name;
  formProfile['profile-profession'].value = profession;

  formProfileValidator.removeValidationErrors();
  formProfileValidator.enableSubmitButton();

  popupProfile.open();
}

// Функция работы с формой для карточки
const clearPopupCardFields = () => {
  formCardValidator.removeValidationErrors();
  formCardValidator.disableSubmitButton();

  popupCard.open();
}

// Слушатель на открытие popup профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  fillPopupProfileFields();
});

// Слушатель на открытие popup карточки
buttonOpenPopupCard.addEventListener('click', () => {
  clearPopupCardFields();
});

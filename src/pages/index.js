import '../pages/index.css';
import {
  formProfile,
  buttonOpenPopupProfile,
  formCard,
  buttonOpenPopupCard
} from '../utils/constants.js';

import { validationConfig } from '../utils/validationConfig.js';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupForDelete } from '../components/PopupForDelete.js';
import { UserInfo } from '../components/UserInfo.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
});

// Создание экземпляров класса валидации
const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, formCard);
formCardValidator.enableValidation();

// Создание экземпляра класса User
const user = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__profession',
  avatarSelector: '.profile__image'
});

// Получение данных о пользователе с сервера
api.getUserInfo()
    .then(({ name, about, avatar }) => {
      user.setUserInfo(name, about);
      user.setUserAvatar(avatar, name);
    })
    .catch(error => {
      console.error(error);
    });

// Создание экземпляра класса PopupWithForm для профиля
const popupProfile = new PopupWithForm(
  '.popup-profile',
  {
    callbackSubmit: (event, {'profile-name': name, 'profile-profession': about}) => {
      event.preventDefault();

      api.saveUserInfo(name, about);
      user.setUserInfo(name, about);
      popupProfile.close();
    }
  }
);

// Создание экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup-image');

// Создание экземпляра класса PopupForDelete
const popupForDelete = new PopupForDelete('.popup-delete', {
  handleButtonClick: () => {
    console.log('Вы удалили карточку!');
    popupForDelete.close();
  }
});

// Функция создания элемента карточки
const createCard = item => {
  const card = new Card(
    item,
    '#elements__template',
    {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
      handleDeleteClick: () => {
        popupForDelete.open();
      }
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// Создание экземпляра класса Section
const sectionCard = new Section({
  renderer: (item) => {
    return createCard(item);
  }
}, '.elements__list-item');

// Отображение карточек, подгруженных с сервера
api.getInitialCards().then((items) => sectionCard.renderItems(items));

// Создание экземпляра класса PopupWithForm для карточки
const popupCard = new PopupWithForm(
  '.popup-card',
  {
    callbackSubmit: (event, {'card-name': name, 'card-profession': link}) => {
      event.preventDefault();

      api.saveCard(name, link)
        .then(response => {
          if(!response.ok) throw new Error('Данные о карточке не загрузились, попробуйте позже');

          return response.json()
        })
        .then(item => {
          const newCard = createCard(item);
          sectionCard.addItem(newCard);
        })
        .catch(error => {
          console.error(error);
        })

      popupCard.close();
    }
  }
);

// Функция работы с формой для профиля
const fillPopupProfileFields = () => {
  api.getUserInfo()
      .then(({ name, about }) => {
        formProfile['profile-name'].value = name;
        formProfile['profile-profession'].value = about;

        formProfileValidator.removeValidationErrors();
        formProfileValidator.enableSubmitButton();

        popupProfile.open();
      })
      .catch(error => {
        console.error(error);
      })
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

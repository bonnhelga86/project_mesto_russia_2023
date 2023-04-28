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

// Создание экземпляра класса User
const user = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__profession',
  avatarSelector: '.profile__image'
});

// Получение данных о пользователе с сервера
user.getUserInfo()
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

      user.saveUserInfo(name, about);
      user.setUserInfo(name, about);
      popupProfile.close();
    }
  }
);

// Создание экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup-image');

// Функция создания элемента карточки
const createCard = item => {
  const card = new Card(
    item,
    '#elements__template',
    {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      }
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// Запрос массива карточек с сервера
const getCards = () => {
  return fetch('https://nomoreparties.co/v1/cohort-65/cards', {
      headers: {
        authorization: '76bd6af4-1eb8-427e-97cd-2bc6cdc45941'
      }
    })
    .then(response => {
      if(!response.ok) throw new Error('Информация о карточках в данный момент недоступна');

      return response.json();
    })
    .then(cardsData => {
      return cardsData;
    })
    .catch(error => {
      console.error(error);
    })
}

// Сохранение карточки на сервере
const saveCard = (name, link) => {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
    method: 'POST',
    headers: {
      authorization: '76bd6af4-1eb8-427e-97cd-2bc6cdc45941',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, link})
  })
}

// Создание экземпляра класса Section
const sectionCard = new Section({
  renderer: (item) => {
    return createCard(item);
  }
}, '.elements__list-item');

// Отображение карточек, подгруженных с сервера
getCards().then((items) => sectionCard.renderItems(items));

// Создание экземпляра класса PopupWithForm для карточки
const popupCard = new PopupWithForm(
  '.popup-card',
  {
    callbackSubmit: (event, {'card-name': name, 'card-profession': link}) => {
      event.preventDefault();

      saveCard(name, link)
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
  user.getUserInfo()
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

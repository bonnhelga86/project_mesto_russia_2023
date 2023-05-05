import '../pages/index.css';
import {
  formProfile,
  formCard,
  formAvatar,
  buttonOpenPopupProfile,
  buttonOpenPopupCard,
  buttonOpenAvatar
} from '../utils/constants.js';

import { validationConfig } from '../utils/validationConfig.js';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '76bd6af4-1eb8-427e-97cd-2bc6cdc45941',
    'Content-Type': 'application/json'
  }
});

// Создание экземпляров класса валидации
const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, formCard);
formCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationConfig, formAvatar);
formAvatarValidator.enableValidation();

// Создание экземпляра класса PopupWithConfirmation
const popupWithConfirmation = new PopupWithConfirmation('.popup-delete', {

  handleButtonClick: (elementForDelete, cardId) => {
    api.deleteCard(cardId)
        .then(() => {
          elementForDelete.remove();
          popupWithConfirmation.close();
        })
        .catch(error => {
          console.error(error);
        });
  }
});

// Создание экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup-image');

// Функция создания элемента карточки
const createCard = (item, userId) => {
  const card = new Card(
    item,
    userId,
    '#elements__template',
    {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
      handleLikeClick: (elementLikes, cardId) => {
        api.likeCard(cardId, elementLikes)
            .then(cardData => {
              card.setLikeStatus(cardData.likes);
            })
            .catch(error => {
              console.error(error);
            });
      },
      handleDeleteClick: (elementForDelete, cardId) => {
        popupWithConfirmation.open(elementForDelete, cardId);
      }
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// Создание экземпляра класса Section
const sectionCard = new Section({
  renderer: (item, userId) => {
    return createCard(item, userId);
  }
}, '.elements__list-item');

// Создание экземпляра класса UserInfo
const user = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__profession',
  avatarSelector: '.profile__image',
  popupSelector: '.popup-profile'
});

const renderLoading = (popupButton, value) => {
  popupButton.textContent = value;
}

// Создание экземпляра класса PopupWithForm для профиля
const popupProfile = new PopupWithForm(
  '.popup-profile',
  {
    callbackSubmit: (event, {'profile-name': userName, 'profile-profession': userAbout}, popup) => {
      event.preventDefault();

      const popupButton = popup.querySelector('.popup__button');
      renderLoading(popupButton, 'Сохранение...');

      api.saveUserInfo(userName, userAbout)
          .then((userData) => {
            user.setUserInfo(userData);
            popupProfile.close();
          })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            renderLoading(popupButton, 'Сохранить');
          });
    }
  }
);

// Получение данных пользователя и карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      user.setUserInfo(userData);
      user.setUserAvatar(userData);

      sectionCard.renderItems(cardsData, userData._id);
    })
    .catch(error => {
      console.error(error);
    });

// Создание экземпляра класса PopupWithForm для редактирования аватара
const popupAvatar = new PopupWithForm(
  '.popup-avatar',
  {
    callbackSubmit: (event, {'avatar-link': userAvatar}, popup) => {
      event.preventDefault();

      const popupButton = popup.querySelector('.popup__button');
      renderLoading(popupButton, 'Сохранение...');

      api.editUserAvatar(userAvatar)
          .then((avatarData) => {
            user.setUserAvatar(avatarData);
            popupAvatar.close();
          })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            renderLoading(popupButton, 'Сохранить');
          });
    }
  }
);

// Создание экземпляра класса PopupWithForm для карточки
const popupCard = new PopupWithForm(
  '.popup-card',
  {
    callbackSubmit: (event, {'card-name': name, 'card-link': link}, popup) => {
      event.preventDefault();

      const popupButton = popup.querySelector('.popup__button');
      renderLoading(popupButton, 'Сохранение...');

      api.saveCard(name, link)
        .then(item => {
          const newCard = createCard(item, item.owner._id);
          sectionCard.addItem(newCard);

          popupCard.close();
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          renderLoading(popupButton, 'Создать');
        })
    }
  }
);

// Функция работы с формой для профиля
const fillPopupProfileFields = () => {
  user.setInputValues(user.getUserInfo());

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

// Функция работы с формой для аватара
const clearPopupAvatarFields = () => {
  formAvatarValidator.removeValidationErrors();
  formAvatarValidator.disableSubmitButton();

  popupAvatar.open();
}

// Слушатель на открытие popup профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  fillPopupProfileFields();
});

// Слушатель на открытие popup аватара
buttonOpenAvatar.addEventListener('click', () => {
  clearPopupAvatarFields();
});

// Слушатель на открытие popup карточки
buttonOpenPopupCard.addEventListener('click', () => {
  clearPopupCardFields();
});

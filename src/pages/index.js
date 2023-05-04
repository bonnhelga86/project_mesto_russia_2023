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
    api.deleteCard(elementForDelete, cardId);
    popupWithConfirmation.close();
  }
});

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
      },
      handleLikeClick: (elementLikes, cardId) => {
        const likeAction = elementLikes.classList.contains('elements__like_type_active') ? 'DELETE' : 'PUT';
        api.likeCard(cardId, likeAction)
            .then(cardData => {
              elementLikes.classList.toggle('elements__like_type_active');
              elementLikes.closest('.elements__content').querySelector('.elements__like-count').textContent = cardData.likes.length;
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
  renderer: (item) => {
    return createCard(item);
  }
}, '.elements__list-item');

// Создание экземпляра класса UserInfo
const user = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__profession',
  avatarSelector: '.profile__image'
});

// Создание экземпляра класса PopupWithForm для профиля
const popupProfile = new PopupWithForm(
  '.popup-profile',
  {
    callbackSubmit: (event, {'profile-name': userName, 'profile-profession': userAbout}, popup) => {
      event.preventDefault();

      api.saveUserInfo(userName, userAbout, popup)
          .then(({ name, about }) => {
            user.setUserInfo(name, about);

            popupProfile.setInputValues({
              'profile-name': name,
              'profile-profession': about
            });
          })
          .catch(error => {
            console.error(error);
          });

      popupProfile.close();
    }
  }
);

// Получение данных пользователя и карточек с сервера
api.getUserInfo()
    .then(({ name, about, avatar }) => {
      user.setUserInfo(name, about);
      user.setUserAvatar(avatar);

      popupProfile.setInputValues({
        'profile-name': name,
        'profile-profession': about
      });

      return api.getInitialCards();
    })
    .then((items) => sectionCard.renderItems(items))
    .catch(error => {
      console.error(error);
    });

// Создание экземпляра класса PopupWithForm для редактирования аватара
const popupAvatar = new PopupWithForm(
  '.popup-avatar',
  {
    callbackSubmit: (event, {'avatar-link': userAvatar}, popup) => {
      event.preventDefault();

      api.editUserAvatar(userAvatar, popup)
          .then(({ avatar }) => {
            user.setUserAvatar(avatar);
          })
          .catch(error => {
            console.error(error);
          });

      popupAvatar.close();
    }
  }
);

// Создание экземпляра класса PopupWithForm для карточки
const popupCard = new PopupWithForm(
  '.popup-card',
  {
    callbackSubmit: (event, {'card-name': name, 'card-link': link}, popup) => {
      event.preventDefault();

      api.saveCard(name, link, popup)
        .then(item => {
          item.isMyCard = true;
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

  formProfileValidator.removeValidationErrors();
  formProfileValidator.enableSubmitButton();

  popupProfile.open();

  // api.getUserInfo()
  //     .then(({ name, about }) => {
  //       formProfile['profile-name'].value = name;
  //       formProfile['profile-profession'].value = about;

  //       formProfileValidator.removeValidationErrors();
  //       formProfileValidator.enableSubmitButton();

  //       popupProfile.open();
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
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

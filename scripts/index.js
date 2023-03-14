// Все popup на странице
const popupList = document.querySelectorAll('.popup');

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

// Функция добавления слушателя на закрытие popu при нажатии Escape
const setEventListenerEscape = event => {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// Функция открывания Popup
const openPopup = popup => {
  document.addEventListener('keyup', setEventListenerEscape);
  popup.classList.add('popup_opened');
}

// Функция предзаполнения input в PopupProfile и очистка валидации
const fillPopupProfileFields = () => {
  formProfile['profile-name'].value = profileName.textContent;
  formProfile['profile-profession'].value = profileProfession.textContent;
  removeValidationErrors(popupProfile);
  openPopup(popupProfile);
}

// Функция очистки полей формы добавления карточки
const clearPopupCardFields = () => {
  formCard.reset();
  removeValidationErrors(popupCard);
  openPopup(popupCard);
}

// Функция закрывания Popup
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', setEventListenerEscape);
}

// Функция заполнения popup с изображением
const renderPhotoPopup = card => {
  const { name, link } = card || {};
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

// Функция лайка карточек
const likesCards = card => {
  card.classList.toggle('elements__like_type_active');
}

// Функция удаления карточек
const deleteCards = element => {
  element.remove();
}

// Функция вставки карточки в разметку
const addCard = card => {
  cardList.prepend(card);
}

// Функция генерирования карточек
const createCard = card => {
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

  cardImage.addEventListener('click', event => {
    renderPhotoPopup(card);
  });

  return cardItem;
}

// Функция перебора массива с карточками и получения данных
const renderCards = () => {
  initialCards.forEach(cardData => {
    const card = createCard(cardData);
    addCard(card);
  });
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
  const cardData = {
      name: formCard['card-name'].value,
      link: formCard['card-link'].value
    };
  const card = createCard(cardData);
  addCard(card);
  closePopup(popupCard);
  formCard.reset();
  disableSubmitButton(formCard.querySelector('.popup__button'));
}

renderCards();

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

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

// Список элементов для закрытия Popup
const popupCloseList = document.querySelectorAll('.popup__close');

// База данных карточек
const initialCards = [
  {
    name: 'Алтай',
    link: './images/Altay.jpg'
  },
  {
    name: 'Карелия',
    link: './images/Kareliia.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/Kamchatka.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/Karachaevo.jpg'
  },
  {
    name: 'Кавказ',
    link: './images/Kavkaz.jpg'
  },
  {
    name: 'Байкал',
    link: './images/Baykal.jpg'
  }
];

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
  const popupImagePhoto = popupImage.querySelector('.popup-image__photo');
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImage.querySelector('.popup-image__caption').textContent = name;
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

// Функция генерирования карточек
function renderCards(cards) {
    cards.forEach( (card) => {
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

      cardList.prepend(cardItem);
  })
}

// Функция при Submit Profile
function submitProfile(formData) {
  profileName.textContent = formData.get('profile-name');
  profileProfession.textContent = formData.get('profile-profession');
  closePopup(popupProfile);
}

// Функция при Submit Card
function submitCard(formData) {
  const card = [
    {
      name: formData.get('card-name'),
      link: formData.get('card-link')
    }
  ];
  renderCards(card);
  closePopup(popupCard);
  formCard.reset();
}

// Функция сбора данных из полей форм
function submitGetData(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  formData.has('profile-name') ? submitProfile(formData) : submitCard(formData);
}

renderCards(initialCards);

// Устанавливаются слушатели событий
buttonOpenPopupProfile.addEventListener('click', () => fillPopupProfileFields());
buttonOpenPopupCard.addEventListener('click', () => openPopup(popupCard));

popupCloseList.forEach(function(element) {
  element.addEventListener('click', (event) => closePopup(event.target.closest('.popup')));
});

formProfile.addEventListener('submit', submitGetData);
formCard.addEventListener('submit', submitGetData);

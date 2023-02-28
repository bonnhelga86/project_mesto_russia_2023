// Элементы блока Popup
const popupProfile = document.querySelector('.popup-profile');
const formProfile = popupProfile.querySelector('.form');
const buttonOpenPopupProfile = document.querySelector('.profile__edit');

const popupCard = document.querySelector('.popup-card');
const formCard = popupCard.querySelector('.form');
const buttonOpenPopupCard = document.querySelector('.profile__button');

const popupImage = document.querySelector('.popup-image');
// Элементы взаимодействия с Popup
const popupOpenList = document.querySelectorAll('.popup-open');
const popupCloseList = document.querySelectorAll('.popup__close');
// Элементы блока Profile
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
// Элементы блока Card
const cardList = document.querySelector('.elements__list-item');
const cardTemplate = document.querySelector('#elements__template').content;

// База данных карточек
const cards = [
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

function fillPopupProfileFields() {
  formProfile['profile-name'].value = profileName.textContent;
  formProfile['profile-profession'].value = profileProfession.textContent;
}

// Функция открывания Popup
function openPopup(popup) {
  popup.classList.contains('popup-profile') && fillPopupProfileFields();

  popup.classList.contains('popup_hidden') && popup.classList.remove('popup_hidden');
  popup.classList.add('popup_opened');
}

// Функция закрывания Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция сбора данных из полей форм
function submitGetData(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  formData.has('profile-name') ? submitProfile(formData) : submitCard(formData);
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
}

// Функция заполнения Popup для картинки
function renderPhotoPopup(card) {
  const { name, link } = card || {};
  popupImagePhoto = popupImage.querySelector('.popup-image__photo');
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImage.querySelector('.popup-image__caption').textContent = name;

  openPopup(popupImage);
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

      cardItem.addEventListener('click', event => renderPhotoPopup(card));

      cardList.prepend(cardItem);
  })
}

// Функция лайка карточек
function likesCards(card, index) {
  card.classList.toggle('elements__like_type_active');
}

// Функция удаления карточек
function deleteCards(element) {
  element.remove();
}

renderCards(cards);

// Устанавливаются слушатели событий
buttonOpenPopupProfile.addEventListener('click', () => openPopup(popupProfile));
buttonOpenPopupCard.addEventListener('click', () => openPopup(popupCard));

popupCloseList.forEach(function(element) {
  element.addEventListener('click', (event) => closePopup(event.target.closest('.popup')));
});

formProfile.addEventListener('submit', event => submitGetData(event));
formCard.addEventListener('submit', event => submitGetData(event));

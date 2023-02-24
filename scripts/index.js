const popup = document.querySelector('.popup');
// Элементы взаимодействия с Popup
const popupOpen = document.querySelectorAll('.popup-open');
const popupEditSave = document.querySelector('.popup__button');
const popupClose = document.querySelectorAll('.popup__close');
// Элементы блока Profile
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputName = document.querySelector('.popup__input_type_name');
const inputProfession = document.querySelector('.popup__input_type_profession');
// Элементы блока Card
const cardList = document.querySelector('.elements__list-item');
const cardTemplate = document.querySelector('#elements__template').content;
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');

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

function renderCards() {
  cards.forEach(function(card) {
    const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
    cardItem.querySelector('.elements__photo').src = card.link;
    cardItem.querySelector('.elements__title').textContent = card.name;
    cardList.append(cardItem);
  })
}

function openPopup(element) {
  document.querySelector(`.${element}`).classList.add('popup_opened');
  if(element === 'popup-profile') {
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
  }
}

function savePopupEdit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup();
}

function closePopup(element) {
  element.classList.remove('popup_opened');
}

renderCards();

popupOpen.forEach(function(element) {
  element.addEventListener('click', function(event) {
    return openPopup(event.target.classList.contains('popup-open_profile') ? 'popup-profile' : 'popup-card');
  })
})

popupEditSave.addEventListener('click', savePopupEdit);

popupClose.forEach(function(element) {
  element.addEventListener('click', function(event) {
    return closePopup(event.target.closest('.popup'));
  })
})

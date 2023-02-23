const profileEditOpen = document.querySelector('.profile__edit');
const popupEditSave = document.querySelector('.popup__button');
const popupEditClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputName = document.querySelector('.popup__input_type_name');
const inputProfession = document.querySelector('.popup__input_type_profession');
const cardList = document.querySelector('.elements__list-item');
const cardTemplate = document.querySelector('#elements__template').content;

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

function openProfileEdit() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

function savePopupEdit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopupEdit();
}

function closePopupEdit() {
  popup.classList.remove('popup_opened');
}

renderCards();

profileEditOpen.addEventListener('click', openProfileEdit);
popupEditSave.addEventListener('click', savePopupEdit);
popupEditClose.addEventListener('click', closePopupEdit);

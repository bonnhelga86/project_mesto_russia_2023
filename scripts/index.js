// Элементы блока Popup
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('form');
// Элементы взаимодействия с Popup
const popupOpen = document.querySelectorAll('.popup-open');
const popupClose = document.querySelectorAll('.popup__close');
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

// Настройки для элементов формы Popup
const popupOptions = {
  profile: () => ({
    title: 'Редактировать профиль',
    fields: [
      {
        name: 'profile-name',
        type: 'text',
        placeholder: 'Ваше имя',
        class: 'popup__input popup__input_type_name',
        required: true,
        value: profileName.textContent
      },
      {
        name: 'profile-profession',
        type: 'text',
        placeholder: 'Ваш тип деятельности',
        class: 'popup__input popup__input_type_profession',
        required: true,
        value: profileProfession.textContent
      }
    ],
    buttonText: 'Сохранить',
    submitHandler: submitProfile,
  }),
  card: () => ({
    title: 'Новое место',
    fields: [
      {
        name: 'card-name',
        type: 'text',
        placeholder: 'Название',
        class: 'popup__input popup__input_type_card-name',
        required: true
      },
      {
        name: 'card-link',
        type: 'text',
        placeholder: 'Ссылка на картинку',
        class: 'popup__input popup__input_type_card-link',
        required: true
      }
    ],
    buttonText: 'Создать',
    submitHandler: submitCard,
  })
}

// Функция динамического заполнения и отображения полей формы для Popup
function renderPopup(type) {
  const { title, fields, buttonText, submitHandler } = popupOptions[type]() || {};
  popup.querySelector('.popup__title').textContent = title;
  // Добавление input в форму Popup
  fields.forEach(inputAttributes => {
    const input = document.createElement('input');
    Object.keys(inputAttributes).forEach( key => input.setAttribute(key, inputAttributes[key]) );
    popupForm.append(input);
  })
  // Добавление кнопки submit в форму Popup
  const buttonSubmit = document.createElement('button');
  buttonSubmit.textContent = buttonText;
  buttonSubmit.classList.add('button', 'popup__button', 'save-popup');

  popupForm.append(buttonSubmit);

  popupForm.addEventListener('submit', submitHandler, {once: true});

  openPopup();
}

// Функция открывания Popup
function openPopup() {
  popup.classList.add('popup_opened');
}

// Функция при Submit Profile
function submitProfile(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  profileName.textContent = formData.get('profile-name');
  profileProfession.textContent = formData.get('profile-profession');
  closePopup();
}

// Функция при Submit Card
function submitCard(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  cards.unshift({
    name: formData.get('card-name'),
    link: formData.get('card-link')
  });
  closePopup();
  cardList.innerHTML='';
  renderCards();
}

// Функция закрывания Popup
function closePopup() {
  popup.classList.remove('popup_opened');
  popupForm.innerHTML='';
}

// Функция генерирования карточек
function renderCards() {
    cards.forEach( (card, index) => {
      const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);

      const cardImage = cardItem.querySelector('.elements__photo');
      cardImage.src = card.link;
      cardImage.alt = card.name;
      cardItem.querySelector('.elements__title').textContent = card.name;

      cardItem.querySelector('.elements__like').addEventListener('click', (event) => event.target.classList.toggle('elements__like_type_active'));

      const buttonDelete = cardItem.querySelector('.elements__trash');
      buttonDelete.setAttribute('data-key', index);
      buttonDelete.addEventListener('click', (event) => deleteCards(event.target.getAttribute('data-key')));

      cardList.append(cardItem);
  })
}

// Функция удаления карточек
function deleteCards(index) {
  cards.splice(index, 1);
  cardList.innerHTML='';
  renderCards();
}

renderCards();

// Устанавливаются слушатели событий
popupOpen.forEach(function(element) {
  element.addEventListener('click', event => renderPopup(event.target.getAttribute('data-popup-type')));
})

popupClose.forEach(function(element) {
  element.addEventListener('click', (event) => closePopup(event.target.closest('.popup')))
})

const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('form');
// Элементы взаимодействия с Popup
const popupOpen = document.querySelectorAll('.popup-open');
const popupEditSave = document.querySelector('.popup__button');
const popupClose = document.querySelectorAll('.popup__close');
// Элементы блока Profile
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
// Элементы блока Card
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
  card: (values) => ({
    title: 'Новое место',
    fields: [
      {
        name: 'card-name',
        type: 'text',
        placeholder: 'Название',
        class: 'popup__input popup__input_type_card-name',
        required: true,
        value: values['card-name'] || ''
      },
      {
        name: 'card-link',
        type: 'text',
        placeholder: 'Ссылка на картинку',
        class: 'popup__input popup__input_type_card-link',
        required: true,
        value: values['card-link'] || ''
      }
    ],
    buttonText: 'Создать',
    submitHandler: submitCard,
  })
}

// Функция динамического заполнения и отображения полей формы для Popup
function renderPopup(type, values={}) {
  // Values для предзаполнения карточек exapmple {name: value,...}
  const { title, fields, buttonText, submitHandler } = popupOptions[type](values) || {};
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

  popupForm.addEventListener('submit', submitHandler);

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
  console.log(event);

}

// Функция закрывания Popup
function closePopup() {
  popup.classList.remove('popup_opened');
  popupForm.innerHTML='';
}

// Функция генерирования карточек
function renderCards() {
  // cardList === '' && clearList(cardList.children);

  cards.forEach(function(card) {
    const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
    cardItem.querySelector('.elements__photo').src = card.link;
    cardItem.querySelector('.elements__title').textContent = card.name;
    cardList.append(cardItem);
  })
}

renderCards();

// Устанавливаются слушатели событий
popupOpen.forEach(function(element) {
  element.addEventListener('click', (event) => renderPopup(event.target.getAttribute('data-popup-type')));
})

//Другой вариант вызова функции Popup
// popupOpen.forEach(function(element) {
//   element.addEventListener('click', ({ target }) => renderPopup(target.getAttribute('data-popup-type')));
// })

popupClose.forEach(function(element) {
  element.addEventListener('click', (event) => closePopup(event.target.closest('.popup')))
})

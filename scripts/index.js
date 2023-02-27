// Элементы блока Popup
const popupForm = document.querySelector('.popup-form');
const popupImage = document.querySelector('.popup-image');
const form = popupForm.querySelector('.popup-form__form');
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

// Настройки для элементов формы Popup
const popupOptions = {
  profile: () => ({
    title: 'Редактировать профиль',
    fields: [
      {
        name: 'profile-name',
        type: 'text',
        placeholder: 'Ваше имя',
        class: 'popup-form__input popup-form__input_type_name',
        required: true,
        value: profileName.textContent
      },
      {
        name: 'profile-profession',
        type: 'text',
        placeholder: 'Ваш тип деятельности',
        class: 'popup-form__input popup-form__input_type_profession',
        required: true,
        value: profileProfession.textContent
      }
    ],
    buttonText: 'Сохранить',
  }),
  card: () => ({
    title: 'Новое место',
    fields: [
      {
        name: 'card-name',
        type: 'text',
        placeholder: 'Название',
        class: 'popup-form__input popup-form__input_type_card-name',
        required: true
      },
      {
        name: 'card-link',
        type: 'text',
        placeholder: 'Ссылка на картинку',
        class: 'popup-form__input popup-form__input_type_card-link',
        required: true
      }
    ],
    buttonText: 'Создать',
  })
}

// Функция динамического заполнения и отображения полей формы для Popup
function renderFormPopup(type) {
  const { title, fields, buttonText, submitHandler } = popupOptions[type]() || {};
  popupForm.querySelector('.popup-form__title').textContent = title;
  // Добавление input в форму Popup
  fields.forEach(inputAttributes => {
    const input = document.createElement('input');
    Object.keys(inputAttributes).forEach( key => input.setAttribute(key, inputAttributes[key]) );
    form.append(input);
  })
  // Добавление кнопки submit в форму Popup
  const buttonSubmit = document.createElement('button');
  buttonSubmit.textContent = buttonText;
  buttonSubmit.classList.add('button', 'popup-form__button', 'save-popup');

  form.append(buttonSubmit);

  form.addEventListener('submit', submitGetData, {once: true});

  openPopup(popupForm);
}

// Функция заполнения Popup для картинки
function renderPhotoPopup(index) {
  const { name, link } = cards[index] || {};
  popupImagePhoto = popupImage.querySelector('.popup-image__photo');
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImage.querySelector('.popup-image__caption').textContent = name;

  openPopup(popupImage);
}

// Функция открывания Popup
function openPopup(popup) {
  popup.classList.contains('popup_hidden') && popup.classList.remove('popup_hidden');
  popup.classList.add('popup_opened');
}

// Функция закрывания Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  form.innerHTML='';
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
  closePopup(popupForm);
}

// Функция при Submit Card
function submitCard(formData) {
  cards.unshift({
    name: formData.get('card-name'),
    link: formData.get('card-link')
  });
  closePopup(popupForm);
  cardList.innerHTML='';
  renderCards();
}

// Функция генерирования карточек
function renderCards() {
    cards.forEach( (card, index) => {
      const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);

      const cardImage = cardItem.querySelector('.elements__photo');
      cardImage.src = card.link;
      cardImage.alt = card.name;

      cardItem.querySelector('.elements__title').textContent = card.name;

      const buttonLike = cardItem.querySelector('.elements__like');
      card.liked && buttonLike.classList.add('elements__like_type_active');
      buttonLike.addEventListener('click', event => {
        event.stopPropagation();
        likesCards(event.target, index);
      });

      const buttonDelete = cardItem.querySelector('.elements__trash');
      buttonDelete.setAttribute('data-key', index);
      buttonDelete.addEventListener('click', event => {
        event.stopPropagation();
        deleteCards(event.target.getAttribute('data-key'));
      });

      cardItem.addEventListener('click', event => renderPhotoPopup(index));
      cardList.append(cardItem);
  })
}

// Функция лайка карточек
function likesCards(card, index) {
  cards[index].liked =! cards[index].liked;
  card.classList.toggle('elements__like_type_active');
}

// Функция удаления карточек
function deleteCards(index) {
  cards.splice(index, 1);
  cardList.innerHTML='';
  renderCards();
}

renderCards();

// Устанавливаются слушатели событий
popupOpenList.forEach(function(element) {
  element.addEventListener('click', event => renderFormPopup(event.target.getAttribute('data-popup-type')));
})

popupCloseList.forEach(function(element) {
  element.addEventListener('click', (event) => closePopup(event.target.closest('.popup')))
})

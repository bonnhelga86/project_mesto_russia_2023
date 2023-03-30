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

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  _likeCard() {
    this._cardElement.querySelector('.elements__like').cardList.toggle('elements__like_type_active');
  }

  _deleteCard() {
    this._cardElement.querySelector('.elements__trash').remove();
  }

  _setEventListeners() {
    this._cardElement.querySelector('.elements__like').addEventListener('click', () => {
      this._likeCard();
    });

    this._cardElement.querySelector('.elements__trash').addEventListener('click', () => {
      this._deleteCard();
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    _setEventListeners();

    const cardImage = this._cardElement.querySelector('.elements__photo');
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._cardElement.querySelector('.elements__title').textContent = this._name;

    return this._cardElement;
  }
}

// Функция вставки карточки в разметку
const addCard = card => {
  cardList.prepend(card);
}

initialCards.forEach(card => {
  const card = new Card(card.name, card.link, '.elements__template');
  const cardElement = card.generateCard();
  addCard(cardElement);
})

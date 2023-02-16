let profileEditOpen = document.querySelector('.profile__edit');
let popupEditSave = document.querySelector('.popup__button');
let popupEditClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let hasValue = {};

function openProfileEdit() {
  popup.classList.add('popup_opened');
  let openPopupValue = getValue();
  openPopupValue.inputName.value = openPopupValue.profileName.textContent;
  openPopupValue.inputProfession.value = openPopupValue.profileProfession.textContent;
}

function savePopupEdit(event) {
  event.preventDefault();
  let savePopupValue = getValue();
  savePopupValue.profileName.textContent = savePopupValue.inputName.value;
  savePopupValue.profileProfession.textContent = savePopupValue.inputProfession.value;
  closePopupEdit();
}

function closePopupEdit() {
  popup.classList.remove('popup_opened');
}

function getValue() {
  hasValue = {
    profileName: document.querySelector('.profile__name'),
    profileProfession: document.querySelector('.profile__profession'),
    inputName: document.querySelector('.popup__input_type_name'),
    inputProfession: document.querySelector('.popup__input_type_profession')
  };
  return hasValue;
}

profileEditOpen.addEventListener('click', openProfileEdit);
popupEditSave.addEventListener('click', savePopupEdit);
popupEditClose.addEventListener('click', closePopupEdit);

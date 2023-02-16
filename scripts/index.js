let profileEditOpen = document.querySelector('.profile__edit');
let popupEditSave = document.querySelector('.popup__button');
let popupEditClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let inputName = document.querySelector('.popup__input_type_name');
let inputProfession = document.querySelector('.popup__input_type_profession');

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

profileEditOpen.addEventListener('click', openProfileEdit);
popupEditSave.addEventListener('click', savePopupEdit);
popupEditClose.addEventListener('click', closePopupEdit);

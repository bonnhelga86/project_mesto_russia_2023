let popupEditOpen = document.querySelector('.profile__edit');
let popupEditSave = document.querySelector('.popup__save-button');
let popupEditClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');

popupEditOpen.addEventListener('click', openPopupEdit);
popupEditSave.addEventListener('click', savePopupEdit);
popupEditClose.addEventListener('click', closePopupEdit);

function openPopupEdit() {
  popup.classList.add('popup_opened');
  let openPopupValue = getValue();
  openPopupValue.inputName.value = openPopupValue.profileName.textContent;
  openPopupValue.inputProfession.value = openPopupValue.profileProfession.textContent;
}

function savePopupEdit(event) {
  let savePopupValue = getValue();
  savePopupValue.profileName.textContent = savePopupValue.inputName.value;
  savePopupValue.profileProfession.textContent = savePopupValue.inputProfession.value;
  event.preventDefault();
  closePopupEdit();
}

function closePopupEdit() {
  popup.classList.remove('popup_opened');
}

function getValue() {
  let hasValue = {
    profileName: document.querySelector('.profile__name'),
    profileProfession: document.querySelector('.profile__profession'),
    inputName: document.querySelector('.popup__input_type_name'),
    inputProfession: document.querySelector('.popup__input_type_profession')
  };
  return hasValue;
}

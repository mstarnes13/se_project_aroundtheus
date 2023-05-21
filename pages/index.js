import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closePopup } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/************
 * ELEMENTS *
 ************/
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardEditForm = profileAddModal.querySelector(".modal__form");
const cardImageModal = document.querySelector("#card-image-modal");
const captionName = document.querySelector("#caption-name");
const modalImageElement = document.querySelector(".modal__image");
const imageCloseButton = document.querySelector("#image-close-button");
// const closeButtons = document.querySelectorAll(".modal__close");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = document.querySelector(
  "#profile-modal-close-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addCloseButton = document.querySelector("#add-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardEditForm.querySelector("#add-card-title-input");
const cardUrlInput = addCardEditForm.querySelector("#image-url");

/*************
 * FUNCTIONS *
 *************/
const addClickOffPopupListener = (modalElement) => {
  modalElement.addEventListener("mousedown", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(modalElement);
    }
  });
};

addClickOffPopupListener(profileEditModal);

addClickOffPopupListener(cardImageModal);

addClickOffPopupListener(profileAddModal);

// function deleteCard(card) {
//   card.classList.remove("card");
// }

function renderCard(cardData, cardListEl) {
  const card = new Card(cardData, "#card-template");
  cardListEl.prepend(card.getView());
}

/******************
 * EVENT HANDLERS *
 ******************/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(profileAddModal);
  addCardEditForm.reset();

  // const inputEls = [...addCardEditForm.querySelectorAll(config.inputSelector)];
  // const submitButton = addCardEditForm.querySelector(
  //   config.submitButtonSelector
  // );
  // toggleButtonState(inputEls, submitButton, config);
}

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   cardImageEl.addEventListener("click", () => {
//     modalImageElement.src = cardData.link;
//     modalImageElement.alt = cardData.name;
//     captionName.textContent = cardData.name;
//     openModal(cardImageModal);
//   });

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   cardTitleEl.textContent = cardData.name;

//   return cardElement;
// }
// close modals outside of modal function

/*******************
 * EVENT LISTENERS *
 *******************/
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardEditForm.addEventListener("submit", handleAddCardFormSubmit);

function openEditProfileModal() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}

profileEditButton.addEventListener("click", openEditProfileModal);

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  openModal(profileAddModal);
});

addCloseButton.addEventListener("click", () => closePopup(profileAddModal));

profileModalCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

imageCloseButton.addEventListener("click", () => {
  closePopup(cardImageModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

/**************
 * VALIDATION *
 **************/
const formValidationConfig = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(
  formValidationConfig,
  addCardEditForm
);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidationConfig,
  profileEditForm
);

editFormValidator.enableValidation();

export { modalImageElement, captionName, cardImageModal };

export const initialCards = [
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

/**********
 * MODALS *
 **********/
export const cardTemplate =
  document.querySelector("#card-template").textContent.firstElementChild;
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileAddModal = document.querySelector("#profile-add-modal");
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardEditForm = profileAddModal.querySelector(".modal__form");
export const cardImageModal = document.querySelector("#card-image-modal");
export const captionName = document.querySelector("#caption-name");
export const cardList = document.querySelector(".cards__list");
export const modalImageElement = document.querySelector(".modal__image");
export const profileTitle = document.querySelector(userNameSelector);
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/***********
 * BUTTONS *
 ***********/
export const imageCloseButton = document.querySelector("#image-close-button");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileModalCloseButton = document.querySelector(
  "#profile-modal-close-button"
);
export const addNewCardButton = document.querySelector(".profile__add-button");
export const addCloseButton = document.querySelector("#add-close-button");
export const cardDeleteButton = document.querySelector(".card__button-delete");
export const modalSaveButton = document.querySelector(".modal__button");

/*************
 * SELECTORS *
 *************/
export const userNameSelector = ".profile__title";
export const userDescriptionSelector = ".profile__description";
export const profileModalSelector = "#profile-edit-modal";
export const imageModalSelector = "#card-image-modal";
export const cardModalSelector = "#profile-add-modal";
export const cardListSelector = ".cards__list";
export const modalNameInputSelector = "#profile-title-input";
export const modalDescriptonInputSelector = "#profile-description-input";
export const cardImageSelector = ".card__image";
export const modalNameInput = document.querySelector(modalNameInputSelector);
export const modalDescriptionInput = document.querySelector(
  modalDescriptonInputSelector
);

const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export { initialCards };

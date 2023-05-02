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

// wrappers

const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardEditForm = profileAddModal.querySelector(".modal__form");
const cardImageModal = document.querySelector("#card-image-modal");
const captionName = document.querySelector("#caption-name");
const modalImageElement = document.querySelector(".modal__image");
const imageCloseButton = document.querySelector("#image-close-button");
const closeButtons = document.querySelectorAll(".modal__close");
// buttons and other DOM nodes

const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = document.querySelector(
  "#profile-modal-close-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addCloseButton = document.querySelector("#add-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// form data

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardEditForm.querySelector("#add-card-title-input");
const cardUrlInput = addCardEditForm.querySelector("#image-url");

/*************
 * FUNCTIONS *
 *************/
// close modal function
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyCloseModal);
}

// open modal function
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyCloseModal);
}

function deleteCard(card) {
  card.classList.remove("card");
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

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
  const inputEls = [...addCardEditForm.querySelectorAll(config.inputSelector)];
  const submitButton = addCardEditForm.querySelector(
    config.submitButtonSelector
  );
  toggleButtonState(inputEls, submitButton, config);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    captionName.textContent = cardData.name;
    openModal(cardImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}
// close modals outside of modal function
const addClickOffPopup = (modalElement) => {
  modalElement.addEventListener("mousedown", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(modalElement);
    }
  });
};

// close modal by clicking outside of edit profile modal
addClickOffPopup(profileEditModal);

// close modal by clicking outside of image modal
addClickOffPopup(cardImageModal);

// close modal by clicking outside of modal
addClickOffPopup(profileAddModal);

// close modals with Esc key
const handleEscKeyCloseModal = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
};

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
  openModal(profileAddModal);
});

addCloseButton.addEventListener("click", () => closePopup(profileAddModal));

profileModalCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

imageCloseButton.addEventListener("click", () => {
  closePopup(cardImageModal);
});

initialCards.forEach(renderCard);

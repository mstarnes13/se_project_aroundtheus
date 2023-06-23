import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import Api from "../components/API.js";
import {
  profileEditForm,
  addCardEditForm,
  initialCards,
  cardList,
  validationSettings,
  userNameSelector,
  userDescriptionSelector,
  imageModalSelector,
  profileModalSelector,
  cardModalSelector,
  cardListSelector,
  profileEditButton,
  modalNameInput,
  modalDescriptionInput,
  addNewCardButton,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "9c860865-e6d3-4014-b437-60037dde85fb",
  
});

let cardSection;

api.getInitialCards().then((res) => {
  cardSection = new Section(
    {
      data: res,
      renderer: renderCard,
    },
    cardListSelector
   );
   cardSection.renderItems();
  });

  function renderCard(cardData) {
    const cardImage = createCard(cardData);
    cardSection.addItem(cardImage);
  }


/**************
 * VALIDATION *
 **************/
const addFormValidator = new FormValidator(validationSettings, addCardEditForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

editFormValidator.enableValidation();

/*************
 * CARD INFO *
 *************/




const userInfo = new UserInfo({ userNameSelector, userDescriptionSelector });

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({
    userName: userData.name,
    userDescription: userData.about,
  }); 
});

export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const modalWithImage = new PopupWithImage({
  popupSelector: imageModalSelector,
});

const modalWithFormUser = new PopupWithForm({
  popupSelector: profileModalSelector,
  handleFormSubmit: (cardData) => {
    userInfo.setUserInfo(cardData);
  },
});

const modalFormImage = new PopupWithForm({
  popupSelector: cardModalSelector,
  handleFormSubmit: (inputValues) => {
    api.addCard(inputValues).then(inputValues => {
    renderCard(inputValues);
    modalFormImage.close();
     });
    
  },
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*******************
 * EVENT LISTENERS *
 *******************/

profileEditButton.addEventListener("click", () => {
  modalWithFormUser.open();
  const userData = userInfo.getUserInfo();
  modalNameInput.value = userData.userName;
  modalDescriptionInput.value = userData.userDescription;
  editFormValidator.resetValidation();
});
addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  modalFormImage.open();
});



function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
    },
    "#card-template",
    handleCardClick
  );
  const cardElement = card.getView();
  return cardElement;
}

function handleCardClick(cardData) {
  if (cardData && cardData.link && cardData.name) {
    modalWithImage.open({ link: cardData.link, name: cardData.name });
  }
}

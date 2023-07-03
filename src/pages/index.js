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
  avatarEditButton,
  avatarSelector,
  modalChangeProfileAvatarSelector,
  editModalFormSelector,
  addCardFormSelector,
  avatarModalFormSelector,
  cardModalDelete,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "9c860865-e6d3-4014-b437-60037dde85fb",
});

/*************
 * USER INFO *
 *************/
const userInfo = new UserInfo({
  userNameSelector,
  userDescriptionSelector,
  avatarSelector,
});

let userId, cardSection;

function renderCard(cardData) {
  const cardImage = createCard(cardData);
  cardSection.prependItem(cardImage);
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo({
      userName: userData.name,
      userDescription: userData.about,
      avatar: userData.avatar,
    });
    // userInfo.setAvatarInfo(userData.avatar);
    userId = userData._id;
    cardSection = new Section(
      {
        data: cardData,
        renderer: renderCard,
      },
      cardListSelector
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

/********************
 * POPUP WITH IMAGE *
 ********************/
const modalWithImage = new PopupWithImage({
  modalSelector: imageModalSelector,
});

const modalWithFormUser = new PopupWithForm({
  modalSelector: modalChangeProfileAvatarSelector,
  handleFormSubmit: (data) => {
    modalWithFormUser.renderLoading(true);
    api
      .updateUserProfile({ avatar: data.url })
      .then((data) => {
        userInfo.setAvatarInfo(data.avatar);
        modalWithFormUser.close();
      })
      .catch(console.error)
      .finally(() => {
        modalWithFormUser.renderLoading(false);
      });
  },
  loadingText: "Saving...",
});

console.log('profileModalSelector: ', profileModalSelector)

const modalFormUser = new PopupWithForm({
  modalSelector: profileModalSelector,
  handleFormSubmit: (data) => {
    modalFormUser.renderLoading(true);
    api
      .updateUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo({
          title: data.name,
          description: data.about,
        });
        userInfo.setAvatarInfo(data.avatar);
        modalFormUser.close();
      })
      .catch(console.error)
      .finally(() => {
        modalFormUser.renderLoading(false);
        if ("edit-modal-form" in formValidators) {
          formValidators["edit-modal-form"].resetValidation();
        }
      });
  },
  loadingText: "Saving...",
});

const modalFormImage = new PopupWithForm({
  modalSelector: cardModalSelector,
  handleFormSubmit: (inputValues) => {
    modalFormImage.renderLoading(true);
    console.log('inputValues: ', inputValues)

    api
      .addCard(inputValues)
      .then((inputValues) => {
        renderCard(inputValues);
        modalFormImage.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        modalFormImage.renderLoading(false);
        if ("add-card-form" in formValidators) {
          formValidators["add-card-form"].resetValidation();
        }
      });
  },
  loadingText: "Saving...",
});

const deleteModal = new PopupWithForm({
  handleFormSubmit: () => {
    deleteModal.renderLoading(true);
  },
  modalSelector: cardModalDelete,
  loadingText: "Deleting...",
});

modalFormImage.setEventListeners();
modalWithImage.setEventListeners();
modalFormUser.setEventListeners();
modalWithFormUser.setEventListeners();
deleteModal.setEventListeners();

/**************
 * VALIDATION *
 **************/
// const addFormValidator = new FormValidator(validationSettings, addCardEditForm);
// addFormValidator.enableValidation();

// const editFormValidator = new FormValidator(
//   validationSettings,
//   profileEditForm
// );

// editFormValidator.enableValidation();

/*********************
 * ENABLE VALIDATION *
 *********************/
const formValidators = {};

const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);

    const formId = formElement.getAttribute("id");

    formValidators[formId] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

/*******************
 * EVENT LISTENERS *
 *******************/

profileEditButton.addEventListener("click", () => {
  modalFormUser.open();
  const userData = userInfo.getUserInfo();
  modalNameInput.value = userData.userName;
  modalDescriptionInput.value = userData.userDescription;
  if ("edit-modal-form" in formValidators) {
    formValidators["edit-modal-form"].resetValidation();
  }
});
addNewCardButton.addEventListener("click", () => {
  modalFormImage.open();
  if ("add-card-form" in formValidators) {
    formValidators["add-card-form"].resetValidation();
  }
});

avatarEditButton.addEventListener("click", () => {
  modalWithFormUser.open();
  if ("modal-form-avatar" in formValidators) {
    formValidators["modal-form-avatar"].resetValidation();
  }
});

function createCard(cardData) {
  // const likes = cardData.likes || [];
  // console.log('cardData: ', cardData)
  const card = new Card(
    {
      cardData,
      myId: userId,
      handleCardClick: () => {
        // console.log("cardClick data: ", cardData);
        modalWithImage.open(cardData);
      },
      handleDeleteClick: () => {
        deleteModal.open();
        deleteModal.setSubmitAction(() => {
          deleteModal.renderLoading(true);
          const id = card.getId();
          api
            .deleteCard(id)
            .then(() => {
              card._handleDeleteIcon();
              deleteModal.close();
            })
            .catch(console.error)
            .finally(() => {
              deleteModal.renderLoading(false);
            });
        });
      },

      handleAPILikeClick: () => {
        const id = card.getId();
        // console.log('card Id: ', id)
        if (card.isLiked()) {
          api
            .unLikeCard(id)
            .then((data) => {
              card.setLikes(data.likes);
            })
            .catch((err) => console.error(err));
        } else {
          api
            .likeCard(id)
            .then((data) => {
              card.setLikes(data.likes);
            })
            .catch((err) => console.error(err));
        }
      },
    },
    "#card-template"
  );
  return card.getView();
}

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import Api from "../utils/API.js";
import {
  profileEditForm,
  addCardEditForm,
  addAvatarImageElement,
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
  imageModalSelectorFormSelector,
  cardModalDelete,
} from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "9c860865-e6d3-4014-b437-60037dde85fb",
    "Content-Type": "application/json",
  },
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
      title: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
    (userId = userData._id),
      (cardSection = new Section(
        {
          data: cardData,
          renderer: renderCard,
        },
        cardListSelector
      ));
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

const avatarModal = new PopupWithForm({
  modalSelector: modalChangeProfileAvatarSelector,
  handleFormSubmit: (data) => {
    avatarModal.renderLoading(true);
    api
      .updateUserProfile({ avatar: data.url })
      .then((data) => {
        userInfo.setAvatarInfo(data.avatar);
        avatarModal.close();
      })
      .catch(console.error)

      .finally(() => {
        avatarModal.renderLoading(false);
      });
  },
  loadingText: "Saving...",
});

// console.log('profileModalSelector: ', profileModalSelector)

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

        modalFormUser.close();
      })
      .catch(console.error)

      .finally(() => {
        modalFormUser.renderLoading(false);
      });
  },
  loadingText: "Saving...",
});

const modalFormImage = new PopupWithForm({
  modalSelector: cardModalSelector,
  handleFormSubmit: (inputValues) => {
    modalFormImage.renderLoading(true);
    // console.log('inputValues: ', inputValues)

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
      });
  },

  loadingText: "Saving...",
});

const deleteModal = new PopupWithConfirmation({
  handleFormSubmit: () => {
    deleteModal._handleFormSubmit();
  },
  modalSelector: cardModalDelete,
  loadingText: "Deleting...",
});

modalFormImage.setEventListeners();
modalWithImage.setEventListeners();
modalFormUser.setEventListeners();
avatarModal.setEventListeners();
deleteModal.setEventListeners();

function createCard(cardData) {
  const card = new Card(
    {
      cardData,
      myId: userId,
      handleCardClick: () => {
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
              card.deleteCard();
              deleteModal.close();
            })
            .catch((err) => {
              console.error(err);
            })
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

/*********************
 * ENABLE VALIDATION *
 *********************/
const addFormValidator = new FormValidator(validationSettings, addCardEditForm);

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const profileImageValidator = new FormValidator(
  validationSettings,
  addAvatarImageElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
profileImageValidator.enableValidation();

/*******************
 * EVENT LISTENERS *
 *******************/

profileEditButton.addEventListener("click", () => {
  modalFormUser.open();
  const userData = userInfo.getUserInfo();
  modalNameInput.value = userData.userName;
  modalDescriptionInput.value = userData.userDescription;
  editFormValidator.resetValidation();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  modalFormImage.open();
});

avatarEditButton.addEventListener("click", () => {
  avatarModal.open();
  profileImageValidator.resetValidation();
});

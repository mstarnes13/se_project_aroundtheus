import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ handleFormSubmit, modalSelector, loadingText }) {
    super({ modalSelector });
    this._popupForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._loadingText = loadingText;
    this._confirmDeleteButton = this._modalElement.querySelector(
      "#modal-delete-button"
    );
    this._submitButton = this._modalElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _onSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit();
  };

  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmDeleteButton.textContent = this._loadingText;
    } else {
      this._confirmDeleteButton.textContent = this._submitButtonText;
    }
  }

  open() {
    super.open();
    this._popupForm.addEventListener("submit", this._onSubmit);
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._onSubmit);
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }
}

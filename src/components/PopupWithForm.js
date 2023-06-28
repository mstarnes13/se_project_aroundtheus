import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ modalSelector, handleFormSubmit, loadingText }) {
    super({ modalSelector });
    this._popupForm = this._modalElement.querySelector(".modal__form");
    this._inputList = this._modalElement.querySelectorAll(".modal__form-input");
    this._submitButton = this._modalElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._loadingText = loadingText;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _handleSubmit() {
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  open() {
    this._popupForm.addEventListener("submit", this._handleSubmit);
    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = this._loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

setEventListeners() {
  super.setEventListeners();
  this._popupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  });
}

}

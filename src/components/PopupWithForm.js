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
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    console.log('formValues: ', formValues)
    return formValues;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  open() {
    this._popupForm.addEventListener("submit", this._handleSubmit);
    super.open();
  }

  close() {
    this._popupForm.removeEventListener("submit", this._handleSubmit);
    this._popupForm.reset();
    super.close();
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }
}

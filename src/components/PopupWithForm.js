import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupElement.querySelectorAll(".modal__form-input");
    this._handleFormSubmit = handleFormSubmit.bind(this);

    this._handleSubmit = this._handleSubmit.bind(this);
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
    this._popupForm.removeEventListener("submit", this._handleSubmit);
    this._popupForm.reset();
    super.close();
  }

}

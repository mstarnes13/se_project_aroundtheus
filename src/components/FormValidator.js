export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formEl = formEl;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textConnect = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textConnect = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  resetValidation() {
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });

    this._toggleButtonState();
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonEl.classList.add(this._inactiveButtonClass);
      this._buttonEl.disabled = true;
      return;
    }

    this._buttonEl.classList.remove(this._inactiveButtonClass);
    this._buttonEl.disabled = false;
  }

  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    this._inputList = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._buttonEl = this._formEl.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }

 
}

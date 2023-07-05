import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(modalSelector) {
        super({ modalSelector });
        this._popupForm = this._modalElement.querySelector(".modal__form");
        
    }

    setSubmitAction(action) {
      this._handleFormSubmit = action;
    }

    renderLoading(isLoading, submitSave) {
        if (isLoading) {
          this._popupForm.querySelector(".modal__save-button").textContent = "Deleting...";
        } else {
          this._popupForm.querySelector(".modal__save-button").textContent = submitSave;
        }
      }

      close() {
        super.close();
        this._popupForm.removeEventListener("submit", this._handleFormSubmit);

      }
    setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener("submit", this._handleFormSubmit);
    }
    
      
}
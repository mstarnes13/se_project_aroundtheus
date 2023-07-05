import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(modalSelector) {
        super({ modalSelector });
        this._popupForm = this._modalElement.querySelector(".modal__form");
        
    }

    renderLoading(isLoading, submitSave) {
        if (isLoading) {
          this._popupForm.querySelector(".modal__save-button").textContent = "Deleting...";
        } else {
          this._popupForm.querySelector(".modal__save-button").textContent = submitSave;
        }
      }

      close() {
        this._popupForm.removeEventListener("submit", this._handleFormSubmit);
        super.close();
      }
    
      setSubmitAction(action) {
        this._handleFormSubmit = action;
      }
}
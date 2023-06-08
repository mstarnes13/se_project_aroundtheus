export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    const closeButton = this._popupElement.querySelector(".modal__close");
    this._popupElement.addEventListener("mousedown", this._handleClickClose);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("mousedown", this._handleClickClose);
    this._popupElement.classList.remove("modal_opened");
  }

  _handleClickClose = (evt) => {
    const closeButton = this._popupElement.querySelector(".modal__close");
    if (
      evt.target.classList.contains("modal_opened") ||
      evt.target === closeButton
    ) {
      this.close(evt.target);
    }
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    const modalCloseButton = this._popupElement.querySelector(".modal__close");
    modalCloseButton.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}

export default class Popup {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  _handleClickClose = (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      this.close(evt.target);
    }
  };

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._modalElement.addEventListener("mousedown", this._handleClickClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._modalElement.removeEventListener("mousedown", this._handleClickClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._modalElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.buttonEl.textContent = this._loadingText;
    } else {
      this._buttonEl.textContent = this._submitButtonText;
    }
  }
}

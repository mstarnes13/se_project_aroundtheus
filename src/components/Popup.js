export default class Popup {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    const modalCloseButton = this._modalElement.querySelector(
      ".modal__close-button"
    );
    modalCloseButton.addEventListener("click", () => this.close());
    this._modalElement.addEventListener("click", (event) => {
      if (event.target === this._modalElement) {
        this.close();
      }
    });
  }
}

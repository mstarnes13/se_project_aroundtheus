import Popup from "./Popup";
import "../pages/index";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  open(data) {
    this._modalImage = this._popupElement.querySelector(".card__image");
    this._modalImageCaption =
      this._popupElement.querySelector(".modal__image-name");
    this._modalImage.src = data.link;
    this._modalImage.alt = `Photo of ${data.name}`;
    this._modalImageCaption.textContent = data.name;
    super.open();
  }
}

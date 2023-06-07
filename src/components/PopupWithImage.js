import Popup from "./Popup.js";
import "../pages/index.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  open({ link, name }) {
    this._popupElement.querySelector(".modal__image-name").textContent = name;
    const image = this._popupElement.querySelector("#modal-image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}

export default class Card {
  constructor(
    { cardData, myId, handleLikeClick, handleCardClick, handleDeleteClick },
    cardSelector
  ) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector;
    this._handleLikeClick = handleLikeClick;
    this._likes = cardData.likes;
    this._myId = myId;
    this._ownerId = cardData.owner._id;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._myId);
  }

  setLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  renderLikes() {
    this._likesAmount = this._element.querySelector(".card__like-amount");
    this._likesAmount.textContent = this._likes.length;
    if (this.isLiked()) {
      this._element
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
    } else {
      this._element
        .querySelector(".card__like-button")
        .classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        this._handleDeleteClick();
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._data);
      });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleDeleteButtonIcon() {
    if (this._ownerId !== this._myId) {
      this._element.querySelector(".card__delete-button").remove();
    }
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.renderLikes();

    this._setEventListeners();
    // this._handleLikeClick();
    this._handleDeleteButtonIcon();

    return this._element;
  }
}

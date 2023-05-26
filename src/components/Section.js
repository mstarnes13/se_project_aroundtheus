export default class Section {
  constuctor({ items, renderer }, imageCards) {
    this._renderer = renderer;
    this._items = items;
    this._imageCards = document.querySelector(imageCards);
  }

  renderItems(items) {
    if (items) {
      this._renderer(items);
    } else {
      this._items.forEach((items) => {
        this._renderer(items);
      });
    }
  }

  addItem(itemElement) {
    this._imageCards.prepend(itemElement);
  }
}

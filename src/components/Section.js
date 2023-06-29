export default class Section {
  constructor({ data, renderer }, cardSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(cardSelector);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}

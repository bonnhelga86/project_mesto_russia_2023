export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(newCard = this._itemElement) {
    this._container.prepend(newCard);
  }

  renderItems() {
    this._items.forEach(item => {
      this._itemElement = this._renderer(item);
      this.addItem();
    })
  }
}

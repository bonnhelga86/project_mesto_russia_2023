export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

  }

  addItem(newCard = this._itemElement) {
    this._container.prepend(newCard);
  }

  renderItems(items) {
    items.forEach(item => {
      this._itemElement = this._renderer(item);
      this.addItem();
    })
  }
}

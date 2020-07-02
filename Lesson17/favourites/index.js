export class Favourites {
  constructor (props) {
    this._props = props;
    this._items = [];
    this.createElement();
  }

  add (item) {
    const isAdd = this._items.find(data => data.id === item.id);

    if (!isAdd) {
      this._items.push(item);
    }

    this.render();
  }

  createElement () {
    const el = document.createElement('button');

    this._el = el;
  }

  render () {
    this._el.innerText = `Favourites (${this._items.length})`;

    return this._el;
  }
}

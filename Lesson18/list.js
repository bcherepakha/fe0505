export class List {
  constructor (props = {}) {
    this._props = props;
    this._items = props.items || [];
    this._el = document.querySelector('.todo-list');
  }

  find (callback) {
    return this._items.find(callback);
  }

  filterItems (callback) {
    this._items = this._items.filter(callback);
    this.render();
  }

  getActiveTask () {
    const { filterItems } = this._props;

    if (filterItems) {
      return this._items.filter(filterItems);
    }

    return this._items;
  }

  getActiveTaskCount () {
    return this.getActiveTask().length;
  }

  add (item) {
    this._items.push(item);
    this.render();
  }

  render () {
    this._el.innerText = '';

    if (this._items) {
      this._el.append(...this.getActiveTask().map(item => item.render()));
    }
  }
}

export default class Group {
  constructor (cells) {
    this.cells = cells;
    this.createElement();
  }

  createElement () {
    this._el = document.createElement('div');
    this._el.className = 'board__group';
    this._el.append(...this.cells.map(c => c.render()));
  }

  render () {
    return this._el;
  }
}

import './pagination.less';

export class Pagination {
  constructor (props) {
    this._props = props;
    this._currentPage = props.currentPage;
    this._minPageNumber = props.minPageNumber || 1;
    this._maxPageNumber = props.maxPageNumber;
    this.createElement();
  }

  createElement () {
    const el = document.createElement('div');
    const prevPageEl = document.createElement('a');
    const nextPageEl = document.createElement('a');
    const currentPageEl = document.createElement('span');
    const addData = document.createElement('button');

    el.className = 'pagination';
    prevPageEl.className = 'pagination__item pagination__item--prev';
    nextPageEl.className = 'pagination__item pagination__item--next';
    currentPageEl.className = 'pagination__item pagination__item--current';

    el.append(prevPageEl, currentPageEl, addData, nextPageEl);

    nextPageEl.href = '#next';
    prevPageEl.href = '#prev';

    nextPageEl.innerText = 'next >>';
    prevPageEl.innerText = '<< prev';
    addData.innerText = 'show more';

    this._el = el;
    this._prevPageEl = prevPageEl;
    this._nextPageEl = nextPageEl;
    this._currentPageEl = currentPageEl;
    this._addDataEl = addData;

    nextPageEl.addEventListener('click', this.getPage.bind(this, 'next'));
    prevPageEl.addEventListener('click', this.getPage.bind(this, 'prev'));
    addData.addEventListener('click', this.getPage.bind(this, 'more'));
  }

  setCurrentPage (currentPage) {
    this._currentPage = currentPage;
    this.render();
  }

  getPage (pageNumber, event) {
    event.preventDefault();

    this._props.onGetPage(pageNumber);
  }

  render () {
    this._currentPageEl.innerText = this._currentPage;

    const { _minPageNumber, _maxPageNumber, _currentPage } = this;
    const isNextPageRendered = _maxPageNumber ? _currentPage < _maxPageNumber : true;
    const isPrevPageRendered = _currentPage > _minPageNumber;

    this._nextPageEl.hidden = !isNextPageRendered;
    this._prevPageEl.hidden = !isPrevPageRendered;
    this._addDataEl.hidden = !isNextPageRendered;

    return this._el;
  }
}

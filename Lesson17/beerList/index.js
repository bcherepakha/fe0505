import { getBeer } from '../server';
import { Beer } from '../beer/beer';
import { Pagination } from '../pagination';
import { Favourites } from '../favourites';
import './beerList.less';

const defaultProps = Object.freeze({
  perPage: 25
});

export class BeerList {
  constructor (props) {
    // this._props = Object.assign({}, defaultProps, props);
    this._props = { ...defaultProps, ...props };
    this._el = document.querySelector(props.selector);
    this._currentPage = 1;
    this._perPage = this._props.perPage;
    this._beer = [];
    this._pagination = new Pagination({
      currentPage: this._currentPage,
      onGetPage: this.changePage.bind(this)
    });
    this._favourites = new Favourites();
    this._fetching = false;
    this.getCurrentPageData();
    this.render();
  }

  changePage (pageNumber) {
    if (this._fetching) {
      return;
    }

    switch (pageNumber) {
      case 'next':
        this._currentPage++;
        break;
      case 'prev':
        this._currentPage = Math.max(this._currentPage - 1, 1);
        break;
      case 'more':
        this._fetching = true;
        this._currentPage++;

        return this.getPageData(this._currentPage, this._perPage)
          .then(data => this._beer.push(...data))
          .then(() => this.render())
          .then(() => { this._fetching = false; })
          .then(() => this._pagination.setCurrentPage(this._currentPage));
      default:
        if (!isNaN(+pageNumber)) {
          this._currentPage = +pageNumber;
        }
    }

    this._fetching = true;
    this.getCurrentPageData()
      .then(() => { this._fetching = false; })
      .then(() => this._pagination.setCurrentPage(this._currentPage));
  }

  getPageData (page, perPage) {
    return getBeer({ page, per_page: perPage });
  }

  getCurrentPageData () {
    const { _perPage, _currentPage } = this;

    return this.getPageData(_currentPage, _perPage)
      .then(data => { this._beer = data; })
      .then(() => this.render());
  }

  addToFavourites (beerData) {
    this._favourites.add(beerData);
  }

  renderBeer () {
    return this._beer
      .map(data => new Beer({ data, component: 'li', addToFavourites: this.addToFavourites.bind(this) }))
      .map(b => {
        const el = b.render();

        el.classList.add('beer-list__item');

        return el;
      });
  }

  render () {
    document.body.prepend(this._favourites.render());
    this._el.innerText = '';
    this._el.append(...this.renderBeer());
    document.body.append(this._pagination.render());
  }
}

export class Beer {
  constructor (props) {
    this._props = props;
    this.createElement();
  }

  createFoodPairElement (foodPair) {
    const el = document.createElement('li');

    el.className = 'beer_food-pair';
    el.innerText = foodPair;

    return el;
  }

  createElement () {
    const { component = 'div' } = this._props;
    const { name, image_url: imageUrl, food_pairing: foodPairing } = this._props.data;
    const el = document.createElement(component);
    const titleEl = document.createElement('div');
    const imgWrapperEl = document.createElement('div');
    const imgEl = document.createElement('img');
    const foodListEl = document.createElement('ul');
    const addToFavourites = document.createElement('button');

    el.className = 'beer';
    titleEl.className = 'beer__title';
    titleEl.innerText = name;
    imgWrapperEl.className = 'beer__image-wrapper';
    imgEl.className = 'beer__image';
    imgEl.src = imageUrl;
    foodListEl.className = 'beer__food-pair-list';
    foodListEl.append(...foodPairing.map(this.createFoodPairElement.bind(this)));

    addToFavourites.innerText = 'add';

    addToFavourites.addEventListener('click', this.addToFavourites.bind(this));

    el.append(titleEl, imgWrapperEl, foodListEl, addToFavourites);
    imgWrapperEl.append(imgEl);

    this._el = el;
  }

  addToFavourites () {
    this._props.addToFavourites(this._props.data);
  }

  render () {
    return this._el;
  }
}

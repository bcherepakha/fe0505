import { BeerList } from './beerList';

const beerList = new BeerList({
  selector: '.beer-list',
  perPage: 20
});

beerList.render();

// import { Board } from './board.js';
import Board from './board.js';

const game = new Board({
  complexity: 'hard'
});

const rootEl = document.querySelector('.root');

console.log('game', game);

rootEl.append(game.render());

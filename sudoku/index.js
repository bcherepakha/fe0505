const game = new Board();
const rootEl = document.querySelector('.root');


console.log( game );
console.log( window.sudoku );

rootEl.append( game.render() );

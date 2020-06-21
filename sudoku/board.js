class Board {
    constructor() {
        this._board = this.generateBoard();
        this.createElement();
    }

    createElement() {
        this._el = document.createElement('div');
        this._el.className = 'board';
    }

    generateBoard() {
        let board = window.sudoku.generate("hard");

        return board;
    }

    render() {
        return this._el;
    }
}

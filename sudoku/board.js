import sudoku from './sudoku.js';
import Cell from './cell.js';
import Group from './group.js';

const DIFFICULTIES = {
  easy: 61,
  medium: 52,
  hard: 43,
  'very-hard': 34,
  insane: 25,
  inhuman: 17
};

export class Board {
  constructor (props) {
    this._props = props;
    this.generateBoard();
    this.generateCells();
    this.createElement();
  }

  createElement () {
    this._el = document.createElement('div');
    this._el.className = 'board';
    this._el.innerText = '';
    this._el.append(...this._groups.map(g => g.render()));
  }

  generateBoard () {
    const complexity = (this._props.complexity && DIFFICULTIES[this._props.complexity]) || DIFFICULTIES.medium;

    this._board = sudoku.generate(complexity);
  }

  updateBoardByCells () {
    this._board = this._cells.map(cell => cell.getValue() || '.').join('');

    const candidates = sudoku.get_candidates(this._board);

    this._rows.forEach((row, rowNumber) => {
      row.forEach(
        (cell, cellNumberInRow) => {
          try {
            const candidate = candidates[rowNumber][cellNumberInRow];
            cell.setCandidates(candidate);
          } catch (ex) {
            console.log(ex);
            console.log({ candidates, rowNumber, cellNumberInRow });
          }
        }
      );
    });

    const isGameEnd = this._board.indexOf('.') === -1;

    if (isGameEnd) {
      this.winGame();
    }
  }

  winGame () {
    console.log('You win');
  }

  generateCells () {
    const { _board } = this;
    // const cells = _board.split('');
    const cells = [];
    const candidates = sudoku.get_candidates(this._board);

    for (let i = 0; i < _board.length; i++) {
      const rowNumber = Math.floor(i / 9);
      const collNumber = i % 9;

      cells.push(new Cell({
        id: i,
        value: _board[i],
        candidates: candidates[rowNumber][collNumber],
        onChange: this.onCellChange.bind(this),
        onRemoveValue: this.onCellValueRemove.bind(this)
      }));
    }

    const groups = [];
    const ROW_SHIFT = 9 * 3;
    const COLL_SHIFT = 3;

    for (let row = 0; row < 3; row++) {
      const currentRowShift = row * ROW_SHIFT;

      for (let column = 0; column < 3; column++) {
        const currentCollShift = currentRowShift + COLL_SHIFT * column;

        const group = [
          cells[currentCollShift],
          cells[currentCollShift + 1],
          cells[currentCollShift + 2],
          cells[currentCollShift + 9],
          cells[currentCollShift + 10],
          cells[currentCollShift + 11],
          cells[currentCollShift + 18],
          cells[currentCollShift + 19],
          cells[currentCollShift + 20]
        ];

        groups.push(group);
      }
    }

    const rows = [];
    const colls = [];

    for (let i = 0; i < 9; i++) {
      const row = [];
      const coll = [];

      for (let j = 0; j < 9; j++) {
        row.push(cells[i * 9 + j]);
        coll.push(cells[i + j * 9]);
      }

      rows.push(row);
      colls.push(coll);
    }

    this._cells = cells;
    this._groups = groups.map(cells => new Group(cells));
    this._rows = rows;
    this._colls = colls;
  }

  onCellValueRemove (cellId) {
    const cell = this._cells[cellId];

    cell.setValue('');
    this.updateBoardByCells();
  }

  onCellChange (value, cellId) {
    const cell = this._cells[cellId];
    // const cell = this._cells.find(c => c.getId() === cellId);
    const rowNumber = Math.floor(cellId / 9);
    const collNumber = cellId % 9;
    const groupNumber = 3 * Math.floor(rowNumber / 3) + Math.floor(collNumber / 3);
    const group = this._groups[groupNumber];
    const row = this._rows[rowNumber];
    const coll = this._colls[collNumber];
    const isValueInRow = row.some(currentCell => currentCell.getValue() === value);
    const isValueInColl = !coll.every(currentCell => currentCell.value !== value);
    const isValueInGroup = group.cells.some(currentCell => currentCell.getValue() === value);
    const isInputCorrect = !isValueInRow && !isValueInColl && !isValueInGroup;
    // const isInputNotCorrect = isValueInRow || isValueInColl || isValueInGroup;

    if (isInputCorrect) {
      cell.setValue(value);
      this.updateBoardByCells();
    } else {
      cell.changeCorrectStatus(isInputCorrect);
    }

    console.log('onCellChange', { cellId, cell, isInputCorrect });
  }

  render () {
    return this._el;
  }
}

export default Board;

const EMTY_CELL = ' ';
const X_CELL = 'x';
const O_CELL = 'O';
const USERS = ['X', 'O'];
const CELLS = {
    [USERS[0]]: X_CELL,
    [USERS[1]]: O_CELL
};
const DELIMITER = ' | ';

console.log( CELLS );

// 0 | 1 | 2
// --|---|--
// 3 | 4 | 5
// --|---|--
// 6 | 7 | 8

class CrossGame {
    constructor() {
        // this = {}
        this.gameWin = false;
        this.board = new Array(9).fill(EMTY_CELL);
        this.currentUser = USERS[0];
        // this.__proto__ = CrossGame.prototype
        // return this;
    }

    step( cellNumber ) {
        if (this.gameWin) {
            console.info( 'game already ended' );
            return ;
        }

        if (this.board[cellNumber] === EMTY_CELL) {
            this.board[cellNumber] = CELLS[this.currentUser];

            const isWin = this.isWin();

            if (isWin) {
                this.gameWin = true;
                console.log('win: ', this.currentUser);
            } else {
                this.currentUser = USERS.find(u => u !== this.currentUser);
            }

            this.render();
            return ;
        }

        console.error('wrong step');
    }

    isWin() {
        const testCellValue = CELLS[this.currentUser];
        const { board } = this; // board = this.board
        const testResults = [];
        const testFunction = cellValue => cellValue === testCellValue;

        // function testFunction(cellValue) { return cellValue === testCellValue; }

        for (let idx=0; idx<3; idx++) {
            const row = [
                    board[idx*3], // 3  6
                    board[1 + idx*3], // 4  7
                    board[2 + idx*3]  // 5  8
                ],
                column = [
                    board[idx],   // 1    2
                    board[3 + idx],   // 4    5
                    board[6 + idx]    // 7    8
                ];

                testResults.push(row.every(testFunction), column.every(testFunction));
        }

        testResults.push(
            [
                board[0],
                board[4],
                board[8]
            ].every(testFunction),
            [
                board[2],
                board[4],
                board[6]
            ].every(testFunction)
        );

        return testResults.some(result => result);
    }

    render() {
        let result = ``;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (col !== 0) {
                    result += DELIMITER; // result = result + DELIMITER
                }

                result += this.board[col + row*3];
            }

            if (row !== 2) {
                result += '\n--|---|--\n';
            }
        }

        console.log( result );
    }
}

const game = new CrossGame();

console.dir( CrossGame );
console.log( game );

game.render(); // this = game
game.step(0); // this = game
game.step(4); // error

game.step(1);
game.step(5);
game.step(2);

game.step(3);

console.log( game );

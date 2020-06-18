class CrossHTML extends CrossGame {
    static createCellEl = {
        [CrossGame.USERS[0]]: 'createX',
        [CrossGame.USERS[1]]: 'createO',
    }

    constructor(users) {
        super();
        this._el = document.querySelector('.crossBoard');
        this._cells = Array.from(this._el.querySelectorAll('.crossBoard__cell'));
        this._cells.forEach(
            (cellEl, idx) => cellEl
                .addEventListener( 'click', this.cellClicked.bind(this, idx, cellEl) )
            );
        this.reset();
        this._confirmEl = new ConfirmMessage({
            onAction: {
                startNewGame: this.startNewGame.bind(this),
                cancel: this.cancelGame.bind(this)
            }
        });

        this._users = users;

        if (users) {
            this._usersPlaces = document.querySelectorAll('.users .user');
            this._usersPlaces.forEach(placeEl => {
                const userLabel = placeEl.dataset.label;

                if (users[userLabel]) {
                    placeEl.append( users[userLabel].render() );
                }
            })
        }
    }

    startNewGame() {
        this._confirmEl.hide();
        this.reset();
    }

    cancelGame() {
        this._confirmEl.hide();
    }

    cellClicked(cellNumber, cellEl) {
        const {currentUser} = this,
            innerEl = this[ CrossHTML.createCellEl[currentUser] ]();

        this.step(cellNumber, cellEl, innerEl);
    }

    step( cellNumber, cellEl, innerEl) {
        const canDoStep = super.step( cellNumber );

        if (canDoStep) {
            cellEl.append(innerEl);

            if (this.standoff) {
                this._confirmEl.show('Standoff!');
            } else if (this.gameWin) {
                this._confirmEl.show('Win: ' + this.currentUser);
            }
        } else if (this.standoff || this.gameWin) {
            this._confirmEl.show('Game already ended!');
        }
    }

    reset() {
        super.reset();
        this._cells.forEach(cellEl => cellEl.innerText = '');
    }

    createO() {
        const _el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        _el.innerHTML = `<circle class="o-line" cx="5" cy="5" r="4"/>`;

        _el.setAttribute('class', 'o crossBoard__el');
        _el.setAttribute('viewBox', '0 0 10 10');

        return _el;
    }

    createX() {
        const _el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        _el.innerHTML = `
            <line class="x-line1" x1="2" y1="2" x2="8" y2="8"></line>
            <line class="x-line2" x1="8" y1="2" x2="2" y2="8"></line>
        `;

        _el.setAttribute('class', 'x crossBoard__el');
        _el.setAttribute('viewBox', '0 0 10 10');

        return _el;
    }
}

const users = CrossGame.USERS.reduce(
    (users, userLabel) => {
        users[userLabel] = new User(userLabel, userLabel === 'X' ? 'Ruslan' : 'Jenie');
        // users[userLabel] = new User(userLabel);

        return users;
    }, {});

const htmlGame = new CrossHTML(users);

console.dir( CrossHTML );
console.log( htmlGame );

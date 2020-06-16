class CrossHTML extends CrossGame {
    constructor() {
        super();
        this._el = document.querySelector('.crossBoard');
        this._cells = Array.from(this._el.querySelectorAll('.crossBoard__cell'));
    }

    createO() {
        const _el = document.createElement('svg');

        _el.innerHTML = `<circle class="o-line" cx="5" cy="5" r="4"/>`;

        _el.className = 'o crossBoard__el';
        _el.viewBox = '0 0 10 10';

        return _el;
    }

    createX() {
        const _el = document.createElement('svg');

        _el.innerHTML = `
            <line class="x-line1" x1="2" y1="2" x2="8" y2="8" />
            <line class="x-line2" x1="8" y1="2" x2="2" y2="8" />
        `;

        _el.className = 'x crossBoard__el';
        _el.viewBox = '0 0 10 10';

        return _el;
    }
}

const htmlGame = new CrossHTML();

console.log( htmlGame );

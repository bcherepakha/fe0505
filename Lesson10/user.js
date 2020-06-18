class User {
    constructor(label, name) {
        this._label = label;
        if (!name) {
            this._name = prompt('Enter name of the user ' + label + ': ', label);
        } else {
            this._name = name;
        }

        this.timer = new Timer();
        this.stats = {
            win: 0,
            standoff: 0,
            loose: 0
        }
    }

    createElement() {
        const _template = document.querySelector('#user');
        const _el = document.importNode(_template.content, true);

        this._el = _el;
        this._nameEl = _el.querySelector('.user__name');
        this._timerEl = _el.querySelector('.user__timer');
        this._stats = _el.querySelectorAll('.user__stats-item');
    }

    render() {
        if (!this._el) {
            this.createElement();
        }

        this._nameEl.innerText = this._name + `(${this._label})`;

        return this._el;
    }
}

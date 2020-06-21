class User {
    constructor(label, name) {
        this._label = label;
        this.active = false;

        if (!name) {
            this._name = prompt('Enter name of the user ' + label + ': ', label);
        } else {
            this._name = name;
        }

        this._userKey = `user::${this._name}`;

        this.timer = new Timer();

        this.loadDataFromLocalStorage();
    }

    loadDataFromLocalStorage() {
        const stats = localStorage[this._userKey];

        try {
            this.stats = JSON.parse(stats);
        } catch(ex) {
            this.stats = {
                win: 0,
                standoff: 0,
                loose: 0
            }
        }
    }

    saveDataToLocalStorage() {
        localStorage[this._userKey] = JSON.stringify(this.stats);
    }

    get name() {
        return this._name;
    }

    addWin() {
        this.stats.win += 1;
        this.render();
        this.saveDataToLocalStorage();
    }

    addStandoff() {
        this.stats.standoff += 1;
        this.render();
        this.saveDataToLocalStorage();
    }

    addLoose() {
        this.stats.loose++;
        this.render();
        this.saveDataToLocalStorage();
    }

    setActive() {
        this.active = true;
        this.timer.start();
        this.render();
    }

    setInActive() {
        this.active = false;
        this.timer.stop();
        this.render();
    }

    createElement() {
        const _template = document.querySelector('#user');
        const _el = document.importNode(_template.content, true);

        this._el = _el.querySelector('.user');
        this._nameEl = _el.querySelector('.user__name');
        this._timerEl = _el.querySelector('.user__timer');
        this._statsEl = _el.querySelectorAll('.user__stats-item');
        this._counters = Array.from(this._statsEl)
            .map(_el => ({
                    type: _el.dataset.stats,
                    counterEl: _el.querySelector('.user__stats-counter')
                }));
    }

    reset() {
        this.timer.reset();
        this.active = false;
        this.render();
    }

    render() {
        if (!this._el) {
            this.createElement();
        }

        if (this.active) {
            this._el.classList.add('user--active');
        } else {
            this._el.classList.remove('user--active');
        }

        this._nameEl.innerText = this._name + `(${this._label})`;
        this._timerEl.append( this.timer.render() );

        this._counters.forEach(({counterEl, type}) => counterEl.innerText = this.stats[type]);

        return this._el;
    }
}

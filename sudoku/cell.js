class Cell {
    constructor() {
        this.editable = false;
        this.value = '';
        this.createElement();
    }

    createElement() {
        this._el = document.createElement('div');
        this._el.className = 'board__cell';

        if (!this.editable) {
            this._el.append(this.value);
        } else {
            this._input = document.createElement('input');
            this._input.type = 'text';
            this._input.className = 'board__cell-input';
            this._input.setAttribute('maxlength', 1);
            this._input.setAttribute('inputmode', numeric);
            this._input.value = this.value;
            this._el.append(this._input);
        }
    }

    render() {
        return this._el;
    }
}

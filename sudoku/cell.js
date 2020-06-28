export default class Cell {
  constructor (props) {
    this._props = props;

    // _value === '.' -> NaN
    // _value === '9' -> 9
    const _value = +props.value;

    this.editable = isNaN(_value);
    this.value = this.editable ? '' : _value;
    this.isValueCorrect = true;
    this.candidates = props.candidates;

    this.createElement();
  }

  setCandidates (candidates) {
    this.candidates = candidates;
  }

  setValue (value, isValueCorrect = true) {
    this.isValueCorrect = isValueCorrect;
    this.value = value;
    this.render();
  }

  changeCorrectStatus (isValueCorrect) {
    this.isValueCorrect = isValueCorrect;
    this.render();
  }

  getId () {
    return this._props.id;
  }

  getValue () {
    return this.value;
  }

  createElement () {
    this._el = document.createElement('div');
    this._el.className = 'board__cell';

    if (!this.editable) {
      this._el.append(this.value);
    } else {
      this._input = document.createElement('input');
      this._input.type = 'text';
      this._input.className = 'board__cell-input';
      this._input.setAttribute('maxlength', 1);
      this._input.setAttribute('inputmode', 'numeric');
      this._input.value = this.value;
      this._el.append(this._input);
      this._input.addEventListener('input', this.onInput.bind(this));
      this._input.addEventListener('focus', this.renderCandidates.bind(this));
    }
  }

  onInput () {
    const { _input, value: currentValue } = this;
    const value = +_input.value;

    if (_input.value === '') {
      this._props.onRemoveValue(this._props.id);
    } else if (isNaN(value) || value === 0) {
      _input.value = currentValue;
    } else {
      const { onChange, id } = this._props;

      if (onChange) {
        onChange(value, id);
      }
    }
  }

  renderCandidates () {
    console.log(this.candidates);
  }

  render () {
    if (this.isValueCorrect) {
      this._el.classList.remove('board__cell--incorrect');
    } else {
      this._el.classList.add('board__cell--incorrect');
    }

    if (this._input && this.isValueCorrect) {
      this._input.value = this.value;
    }

    return this._el;
  }
}

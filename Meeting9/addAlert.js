const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export class AddAlertForm {
  constructor (props) {
    this._props = props;
    this._dayNames = props.dayNames || DAY_NAMES;
    this._formEl = document.querySelector(this._props.selector);
    this.initForm();

    this._formEl.addEventListener('submit', this.addAlert.bind(this));
  }

  addAlert (event) {
    event.preventDefault();
  }

  addSelectOptions (min, max, selectEl) {
    const options = [];

    for (let value = min; value <= max; value++) {
      options.push(this.createSelectOption(value, value.toString().padStart(2, '0')));
    }

    selectEl.innerText = '';
    selectEl.append(...options);
  }

  createSelectOption (value, text) {
    const el = document.createElement('option');

    el.value = value;
    el.innerText = text;

    return el;
  }

  createWeekDayItem (dayNumber) {
    const el = document.createElement('label');
    const input = document.createElement('input');
    const title = document.createElement('span');

    el.append(input, title);
    el.className = 'add-alert__weekday-item';

    input.className = 'add-alert__weekday-item-checked';
    input.type = 'checkbox';
    input.name = `day${dayNumber}`;
    input.value = dayNumber;

    title.className = 'add-alert__weekday-item-checked';
    title.innerText = this._dayNames[dayNumber];

    return el;
  }

  initForm () {
    const selectCollection = Array.from(this._formEl.querySelectorAll('.add-alert__time-input'));
    const daysFieldSet = this._formEl.querySelector('.add-alert__weekday');

    this._time = {};
    this._days = [];

    selectCollection.forEach(selectEl => {
      const { name } = selectEl;

      this._time[name] = selectEl;
      this.addSelectOptions(0, name === 'hours' ? 23 : 59, selectEl);
    });

    daysFieldSet.innerText = '';

    for (let dayNumber = 1; dayNumber <= 7; dayNumber++) {
      const dayItem = this.createWeekDayItem(dayNumber % 7);

      this._days.push(dayItem);
    }

    daysFieldSet.append(...this._days);
  }
}

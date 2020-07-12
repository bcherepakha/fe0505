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
    const { hours, minutes } = this._time;
    const time = [hours.value, minutes.value];
    const days = this._days.reduce(
      (days, input) => {
        if (input.checked) {
          days.push(+input.value);
        }

        return days;
      },
      []
    );

    if (this._props.onAdd) {
      this._props.onAdd({ time, days });
    }

    this._formEl.reset();
  }

  addSelectOptions (min, max, selectEl) {
    const options = [];

    for (let value = min; value <= max; value++) {
      const valueAsString = value.toString().padStart(2, '0');

      options.push(this.createSelectOption(valueAsString, valueAsString));
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

    return { label: el, input };
  }

  initForm () {
    const selectCollection = Array.from(this._formEl.querySelectorAll('.add-alert__time-input'));
    const daysFieldSet = this._formEl.querySelector('.add-alert__weekday');
    const dayLabels = [];

    this._time = {};
    this._days = [];

    selectCollection.forEach(selectEl => {
      const { name } = selectEl;

      this._time[name] = selectEl;
      this.addSelectOptions(0, name === 'hours' ? 23 : 59, selectEl);
    });

    daysFieldSet.innerText = '';

    for (let dayNumber = 1; dayNumber <= 7; dayNumber++) {
      const { label, input } = this.createWeekDayItem(dayNumber % 7);

      dayLabels.push(label);
      this._days.push(input);
    }

    this._days.sort((input1, input2) => input1.value - input2.value);
    daysFieldSet.append(...dayLabels);
  }

  render () {
    return this._formEl;
  }
}

import { CustomEvents } from './events.js';

export function TicketSortForm (props) {
  this._props = props;
  this._formEl = document.querySelector(props.selector);
  this._radioCollection = Array.from(this._formEl.querySelectorAll(props.sortSelector));
  this._currentFilter = this._radioCollection.find(radioBtn => radioBtn.checked).value;
  this._events = new CustomEvents();

  this.onSortChange = this.onSortChange.bind(this);

  this._radioCollection.forEach(
    radioBtn => radioBtn.addEventListener('change', this.onSortChange)
  );
}

TicketSortForm.prototype.getCurrentSorting = function () {
  return this._currentFilter;
};

TicketSortForm.prototype.onSortChange = function (event) {
  this._currentFilter = event.target.value;
  // this._props.onSortChange();
  this._events.dispatch('change');
};

TicketSortForm.prototype.addEventListener = function (eventName, callback) {
  this._events.addEventListener(eventName, callback);
};

TicketSortForm.prototype.removeEventListener = function (eventName, callback) {
  this._events.removeEventListener(eventName, callback);
};

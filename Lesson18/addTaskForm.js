import { CustomEvents } from '../aviasales/events.js';

export class AddTaskForm {
  constructor (props) {
    this._props = props;
    this._formEl = document.querySelector('.header');
    this._completeEl = this._formEl.querySelector('.complete-all');
    this._taskEl = this._formEl.querySelector('.new-todo');

    this._formEl.addEventListener('submit', this.onSubmit.bind(this));
    this._completeEl.addEventListener('change', this.onComplete.bind(this));

    this.events = new CustomEvents();
    this.events.registerEvents('complete');
    this.events.registerEvents('add');
  }

  onComplete (event) {
    const completed = this._completeEl.checked;
    const { onComplete } = this._props;

    if (onComplete) {
      onComplete(completed);
    } else {
      this.events.dispatch('complete', completed);
    }
  }

  onSubmit (event) {
    event.preventDefault();
    const completed = this._completeEl.checked;
    const title = this._taskEl.value;
    const currentDate = new Date();
    const task = {
      completed,
      title,
      createdAt: currentDate.toJSON()
    };
    const { onSubmit } = this._props;

    this._taskEl.value = '';

    if (onSubmit) {
      onSubmit(task);
    } else {
      this.events.dispatch('add', task);
    }
  }
}

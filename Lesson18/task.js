const DOUBLE_CLICK_TIME = 600;

export class Task {
  constructor (props) {
    this._props = props;

    const { id, completed = false, title } = props.task;

    this._id = id || Date.now();
    this._completed = completed;
    this._title = title;
    this._lastTryToEditTime = null;
    this._editMode = false;
    this.createElement();
  }

  getId () {
    return this._id;
  }

  getCompleted () {
    return this._completed;
  }

  change (newTaskData) {
    if ('completed' in newTaskData) {
      this._completed = newTaskData.completed;
    }

    if ('title' in newTaskData) {
      this._title = newTaskData.title;
    }

    this.setEditMode(false);
  }

  setEditMode (editMode) {
    this._editMode = editMode;

    if (editMode) {
      this._editInput.value = this._title;
    }

    this.render();
  }

  createElement () {
    this._viewEl = this.createViewEl();
    this._editEl = this.createEditEl();

    this._el = document.createElement(this._props.tagName || 'div');
    this._el.append(this._viewEl, this._editEl);
  }

  createEditEl () {
    const el = document.createElement('form');
    const input = document.createElement('input');
    const submitBtn = document.createElement('button');

    el.append(input, submitBtn);
    input.className = 'edit';
    submitBtn.className = 'visually-hidden';
    submitBtn.type = 'submit';
    input.value = this._props.task.title;

    this._editInput = input;

    el.addEventListener('submit', this.onChangeTask.bind(this));

    return el;
  }

  createViewEl () {
    const el = document.createElement('div');
    const input = document.createElement('input');
    const text = document.createElement('span');
    const destroyBtn = document.createElement('button');

    el.append(input, text, destroyBtn);
    el.className = 'view';
    input.className = 'toggle';
    input.type = 'checkbox';
    destroyBtn.className = 'destroy';

    text.innerText = this._props.task.title;

    input.addEventListener('change', this.onChangeComplete.bind(this));
    destroyBtn.addEventListener('click', this.onDestroy.bind(this));
    text.addEventListener('click', this.onTryToEdit.bind(this));

    this._completedEl = input;
    this._titleEl = text;

    return el;
  }

  onTryToEdit () {
    if (!this._lastTryToEditTime) {
      this._lastTryToEditTime = Date.now();
    } else if (DOUBLE_CLICK_TIME > Date.now() - this._lastTryToEditTime) {
      this.setEditMode(true);
      this._lastTryToEditTime = null;
    } else {
      this._lastTryToEditTime = Date.now();
    }
  }

  onDestroy () {
    this._el.remove();

    if (this._props.onDestroy) {
      this._props.onDestroy(this._id);
    }
  }

  onChangeComplete (event) {
    const completed = event.target.checked;

    if (this._props.onComplete) {
      this._props.onComplete(this._id, completed);
    }
  }

  onChangeTask (event) {
    event.preventDefault();

    const newTitle = this._editInput.value;

    this.setEditMode(false);
    if (this._props.onChange) {
      this._props.onChange(this._id, newTitle);
    }
  }

  render () {
    if (this._editMode) {
      this._el.classList.add('editing');
    } else {
      this._el.classList.remove('editing');
    }

    this._completedEl.checked = this._completed;
    this._titleEl.innerText = this._title;

    return this._el;
  }
}

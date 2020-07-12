const DEFAULT_SHIFT = 1;

export class Alert {
  constructor (props) {
    this._props = props;
    this.init();
    this.createElement();
    this.isActive = true;
    this.active = false;
  }

  createElement () {
    const { component = 'div', className, days, dayNames, time, shiftMinutes = DEFAULT_SHIFT } = this._props;
    const el = document.createElement(component);
    const timeEl = document.createElement('div');
    const daysEl = document.createElement('div');
    const audioEl = document.createElement('audio');
    const controlsEl = document.createElement('div');
    const stopBtn = document.createElement('button');
    const pauseBtn = document.createElement('button');

    stopBtn.innerText = 'stop';
    pauseBtn.innerText = `repeat later in ${shiftMinutes} mm`;

    stopBtn.addEventListener('click', this.stop.bind(this));
    pauseBtn.addEventListener('click', this.repeatLater.bind(this));

    controlsEl.append(stopBtn, pauseBtn);

    audioEl.src = './alertPlat.mp3';
    audioEl.controls = false;
    audioEl.setAttribute('preload', 'auto');

    timeEl.className = 'alert__time';
    daysEl.className = 'alert__days';

    timeEl.innerText = time.join(':');
    el.append(timeEl);

    if (days.length > 0) {
      const choosedDayNames = days.map(dayNumber => dayNames[dayNumber]);

      daysEl.innerText = choosedDayNames.join(', ');
      el.append(daysEl);
    }

    if (className) {
      el.className = className;
    }

    el.classList.add('alert');

    this._el = el;
    this._audio = audioEl;
    this._controls = controlsEl;
    this._timeEl = timeEl;
    el.append(audioEl, controlsEl);
  }

  init () {
    this._alertTime = new Date();

    const { time: [hh, mm], days } = this._props;

    this._alertTime.setHours(+hh);
    this._alertTime.setMinutes(+mm);
    this._alertTime.setSeconds(0);
    this._alertTime.setMilliseconds(0);

    if (this._alertTime.getTime() < Date.now()) {
      this._alertTime.setDate(this._alertTime.getDate() + 1);
    }

    const alertDay = this._alertTime.getDay();

    if (days.length > 0 && !days.includes(alertDay)) {
      this.next();
    } else {
      this.registerAlert();
    }
  }

  getTime () {
    return new Date(this._alertTime);
  }

  registerAlert () {
    this._timerId = setTimeout(this.start.bind(this), this._alertTime.getTime() - Date.now());
  }

  start () {
    if (this.isActive) {
      this.active = true;
      this._audio.play();
    }

    this.render();
  }

  stop () {
    this.active = false;
    this.isActive = false;
    this._audio.pause();
    this._audio.currentTime = 0;
    this.next();
    this.render();

    if (this._props.onChangeTime) {
      this._props.onChangeTime();
    }
  }

  next () {
    const { days } = this._props;

    if (days.length > 0) {
      const alertDay = this._alertTime.getDay();
      const neededDay = days.find(dayNumber => dayNumber > alertDay) || days[0];
      let shiftDays = (neededDay - alertDay + 7) % 7;

      if (shiftDays === 0) {
        shiftDays = 7;
      }

      this._alertTime.setDate(this._alertTime.getDate() + shiftDays);
      this.isActive = true;
      this.registerAlert();
    }
  }

  repeatLater () {
    const { shiftMinutes = DEFAULT_SHIFT } = this._props;

    this._audio.pause();
    this._audio.currentTime = 0;
    this.active = false;
    this.isActive = true;
    this._alertTime.setMinutes(this._alertTime.getMinutes() + shiftMinutes);

    const renderedHH = this._alertTime.getHours().toString().padStart(2, '0');
    const renderedMM = this._alertTime.getMinutes().toString().padStart(2, '0');

    this._timeEl.innerText = [renderedHH, renderedMM].join(':');

    this.registerAlert();
    this.render();

    if (this._props.onChangeTime) {
      this._props.onChangeTime();
    }
  }

  render () {
    if (this.isActive) {
      this._el.classList.remove('alert--inactive');
    } else {
      this._el.classList.add('alert--inactive');
    }

    this._controls.hidden = !this.active;

    return this._el;
  }
}

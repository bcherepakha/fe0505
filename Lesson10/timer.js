class Timer {
    constructor() {
        this.currentTime = 0;
        this._el = this.createElement();
    }

    createControls() {
        const controls = [];

        const stopTimerButton = document.createElement('button');
        stopTimerButton.innerText = 'stop';

        stopTimerButton.addEventListener('click', this.stop.bind(this));

        const startTimerButton = document.createElement('button');
        startTimerButton.innerText = 'start';

        startTimerButton.addEventListener('click', this.start.bind(this));

        const resetTimerButton = document.createElement('button');
        resetTimerButton.innerText = 'reset';

        resetTimerButton.addEventListener('click', () => this.reset());

        controls.push(stopTimerButton, startTimerButton, resetTimerButton);
        controls.stopTimerButton = stopTimerButton;
        controls.startTimerButton = startTimerButton;
        controls.resetTimerButton = resetTimerButton;

        return controls;
    }

    createElement() {
        const _el = document.createElement('div');

        return _el;
    }

    start() {
        const _timeStart = new Date();
        this._timeStart = _timeStart;
        this._timeShift = this.currentTime;
        this._timerId = setInterval(this.updateTime.bind(this, _timeStart), 1000);
    }

    updateTime(_timeStart) {
        this.currentTime = Math.round( this._timeShift + (Date.now() - _timeStart.getTime()) / 1000 );

        this.render();
    }

    stop() {
        clearInterval(this._timerId);
        this._timerId = null;

        if (this._timeStart) {
            this.updateTime(this._timeStart);

            this._timeStart = null;
        }
    }

    reset() {
        this.stop();
        this.currentTime = 0;
        this.render();
    }

    render() {
        const mm = Math.floor(this.currentTime/60);
        const ss = this.currentTime % 60;

        this._el.innerText = `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;

        return this._el;
    }
}

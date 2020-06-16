function Timer() {
    this.currentTime = 0;
    this._el = this.createElement();
}

Timer.prototype.createControls = function() {
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

Timer.prototype.createElement = function() {
    const _el = document.createElement('div');

    return _el;
}

Timer.prototype.start = function() {
    console.log('context', this);
    const _timeStart = new Date();
    this._timeStart = _timeStart;
    this._timeShift = this.currentTime;
    this._timerId = setInterval(this.updateTime.bind(this, _timeStart), 1000);
}

Timer.prototype.updateTime = function(_timeStart) {
    this.currentTime = Math.round( this._timeShift + (Date.now() - _timeStart.getTime()) / 1000 );

    this.render();
}

Timer.prototype.stop = function() {
    clearInterval(this._timerId);
    this._timerId = null;

    if (this._timeStart) {
        this.updateTime(this._timeStart);

        this._timeStart = null;
    }
}

Timer.prototype.reset = function() {
    this.stop();
    this.currentTime = 0;
    this.render();
}

Timer.prototype.render = function() {
    const mm = Math.floor(this.currentTime/60);
    const ss = this.currentTime % 60;

    // console.log(this.currentTime);
    // console.log(`${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`);

    this._el.innerText = `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;

    return this._el;
}

const timer = new Timer();
timer._controls = timer.createControls();

document.body.append( timer.render() );
document.body.append( ...timer._controls );

console.log( timer );

const timer2 = new Timer();
timer2._controls = timer2.createControls();

document.body.append( timer2.render() );
document.body.append( ...timer2._controls );

console.log( timer2 );


// const callback = timer.updateTime.bind(timer); // LE = { context = timer, f = timer.updateTime }
// const o = {callback: callback}; //
// callback(); // this = undefined
// o.callback(); // this = o

function bind(context, ...args) {
    const f = this;

    return function(...newArguments) {
        return f.call(context, ...args, ...newArguments);
    }
}

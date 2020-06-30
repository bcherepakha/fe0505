export class CustomEvents {
  constructor () {
    this._events = {};
  }

  addEventListener (eventName, callback) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(callback);
  }

  removeEventListener (eventName, callback) {
    if (this._events[eventName]) {
      this._events[eventName] = this._events[eventName]
        .filter(eventListener => eventListener !== callback);
    }
  }

  dispatch (eventName, eventData) {
    if (this._events[eventName]) {
      this._events[eventName].forEach(eventListener => eventListener(eventData));
    }
  }
}

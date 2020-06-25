class Alert {
  constructor (stopTime, message) {
    this._alertMessage = message;
    this._alertTime = stopTime;
    this._status = 'pending';

    const deltaTime = stopTime.getTime() - Date.now();

    this._promise = new Promise((resolve, reject) => {
      if (deltaTime <= 0) {
        return reject(new Error('can\'t create alert'));
      }

      setTimeout(resolve, deltaTime);
    });

    this._promise
      .then(() => {
        alert(this._alertMessage);

        this._status = 'success';
      })
      .catch(error => {
        alert(error.message);

        this._status = 'error';
      });
  }

  getStatus () {
    return this._status;
  }
}

const b1 = new Alert(new Date(2020, 5, 25, 20, 20), 'first allert');
const secondDate = new Date();

secondDate.setMinutes(secondDate.getMinutes() + 1);

const b2 = new Alert(secondDate, 'second allert');

console.log({ b1, b2 });

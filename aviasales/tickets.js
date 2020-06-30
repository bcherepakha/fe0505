const MINUTES_IN_DAY = 24 * 60;

export class Ticket {
  constructor (ticketData) {
    this._data = ticketData;
    this._segments = this._data.segments.map(d => new TicketSegment(d));
    this.createElement();
  }

  getPrice () {
    return this._data.price;
  }

  getMinPathDuration () {
    return Math.min(...this._data.segments.map(s => s.duration));
  }

  priceToString () {
    const {
      price
    } = this._data;
    const priceString = price.toString();
    const priceParts = [];
    let result = priceString.slice(0, priceString.length % 3 || 3);

    for (let i = priceString.length - 3; i > 0; i -= 3) {
      priceParts.push(priceString.slice(i, i + 3));
    }

    for (let i = priceParts.length - 1; i >= 0; i--) {
      result += ` ${priceParts[i]}`;
    }

    return result;
  }

  getTransplantsCount () {
    return this._segments.map(s => s.getTransplantCount());
  }

  getImageURL () {
    return `//pics.avs.io/99/36/${this._data.carrier}.png`;
  }

  createElement () {
    const _el = document.createElement('div');
    const priceEl = document.createElement('div');
    const logoEl = document.createElement('div');
    const imageEl = document.createElement('img');
    const variantsEl = document.createElement('ul');

    _el.className = 'ticket';
    priceEl.innerText = this.priceToString() + ' P';
    priceEl.className = 'ticket__price';

    logoEl.className = 'ticket__avia-logo';
    imageEl.className = 'ticket__avia-logo-img';
    imageEl.src = this.getImageURL();

    logoEl.append(imageEl);

    variantsEl.className = 'ticket__variants';

    this._segments.forEach(segment => variantsEl.append(segment.render()));

    _el.append(priceEl, logoEl, variantsEl);

    this._el = _el;

    this._outerEl = document.createElement('li');
    this._outerEl.className = 'tickets-list__item';

    this._outerEl.append(_el);
  }

  render () {
    return this._el;
  }

  renderOuter (hidden = false) {
    this._outerEl.hidden = hidden;

    return this._outerEl;
  }
}

export class TicketSegment {
  constructor (segmentData) {
    this._data = segmentData;
    this._startTime = this.createStartTime();
    this.createElement();
  }

  createElement () {
    this._el = document.createElement('li');
    this._el.className = 'ticket__variant';

    const cursEl = document.createElement('div');
    const cursLabelEl = document.createElement('div');
    const cursValueEl = document.createElement('div');

    cursEl.className = 'ticket__variant-item';
    cursLabelEl.className = 'ticket__variant-item-label';
    cursValueEl.className = 'ticket__variant-item-value';

    cursEl.append(cursLabelEl, cursValueEl);
    cursLabelEl.innerText = this.getCurs();
    cursValueEl.innerText = this.getTime();

    const durationEl = document.createElement('div');
    const durationLabelEl = document.createElement('div');
    const durationValueEl = document.createElement('div');

    durationEl.className = 'ticket__variant-item';
    durationLabelEl.className = 'ticket__variant-item-label';
    durationValueEl.className = 'ticket__variant-item-value';

    durationEl.append(durationLabelEl, durationValueEl);
    durationLabelEl.innerText = 'В ПУТИ';
    durationValueEl.innerText = this.getDurationAsString();

    const transplantEl = document.createElement('div');
    const transplantLabelEl = document.createElement('div');
    const transplantValueEl = document.createElement('div');

    transplantEl.className = 'ticket__variant-item';
    transplantLabelEl.className = 'ticket__variant-item-label';
    transplantValueEl.className = 'ticket__variant-item-value';

    transplantEl.append(transplantLabelEl, transplantValueEl);
    transplantLabelEl.innerText = this.getTransplantCountAsString();
    transplantValueEl.innerText = this.getTransplantsString();

    this._el.append(cursEl, durationEl, transplantEl);
  }

  getTransplantsString () {
    return this._data.stops.join(', ');
  }

  getTransplantCountAsString () {
    const count = this.getTransplantCount();

    switch (count) {
      case 0:
        return 'БЕЗ ПЕРЕСАДОК';
      case 1:
        return `${count} ПЕРЕСАДКА`;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return `${count} ПЕРЕСАДОК`;
      default:
        return `${count} ПЕРЕСАДКИ`;
    }
  }

  getDurationAsString () {
    if (!this._durationAsString) {
      const dd = Math.floor(this._data.duration / (MINUTES_IN_DAY));
      const hh = Math.floor((this._data.duration % (MINUTES_IN_DAY)) / 60);
      const mm = this._data.duration % 60;

      this._durationAsString = '';

      if (dd > 0) {
        this._durationAsString += dd.toString() + 'д';
      }

      if (hh > 0) {
        this._durationAsString += hh.toString() + 'ч';
      }

      if (mm > 0) {
        this._durationAsString += mm.toString() + 'ч';
      }
    }

    return this._durationAsString;
  }

  createStartTime () {
    return new Date(this._data.date);
  }

  getStartTime () {
    return this._startTime;
  }

  createEndTime () {
    const endTime = new Date(this.getStartTime());

    endTime.setMinutes(endTime.getMinutes() + this._data.duration);

    return endTime;
  }

  getEndTime () {
    if (!this._endTime) {
      this._endTime = this.createEndTime();
    }

    return this._endTime;
  }

  getTime () {
    if (!this._time) {
      const startTime = this.getStartTime();
      const endTime = this.getEndTime();

      this._time = `${this.dateToString(startTime)} - ${this.dateToString(endTime)}`;
    }

    return this._time;
  }

  dateToString (d) {
    const hh = d.getHours().toString().padStart(2, '0');
    const mm = d.getMinutes().toString().padStart(2, '0');

    return `${hh}:${mm}`;
  }

  getCurs () {
    if (!this._curs) {
      this._curs = `${this._data.origin} - ${this._data.destination}`;
    }

    return this._curs;
  }

  getTransplantCount () {
    return this._data.stops.length;
  }

  render () {
    return this._el;
  }
}

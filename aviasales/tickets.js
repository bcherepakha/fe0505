class Ticket {
    constructor(ticketData) {
        this._data = ticketData;
        this._segments = this._data.segments.map(d => new TicketSegment(d));
    }

    priceToString() {
        const { price } = this._data,
            priceString = price.toString(),
            priceParts = [];
        let result = priceString.slice(0, priceString.length % 3 || 3);

        for (let i = priceString.length - 3; i > 0; i -= 3) {
            priceParts.push( priceString.slice(i, i + 3) );
        }

        for (let i = priceParts.length - 1; i >=0; i--) {
            result += ` ${priceParts[i]}`;
        }

        return result;
    }

    getTransplantsCount() {
        return this._segments.map(s => s.getTransplantCount());
    }
}

class TicketSegment {
    constructor(segmentData) {
        this._data = segmentData;
    }

    getTransplantCount() {
        return this._data.stops.length;
    }
}

const data = tickets.map(ticketData => new Ticket(ticketData));
const ticket = data[0];
console.log(data);
console.log(ticket);
console.log( ticket._data.price, ticket.priceToString() );
console.log( 'TransplantsCount', ticket.getTransplantsCount() );

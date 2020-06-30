import { Ticket } from './tickets.js';

export class TicketList {
  constructor (props = {}) {
    this._props = props;
    this._container = document.querySelector(props.selector);
    this.sortTickets = this.sortTickets.bind(this);
    this.setTickets([]);
  }

  setTickets (ticketsData) {
    this.tickets = ticketsData.map(ticket => new Ticket(ticket));
    this.render();
  }

  setSorting (sortBy) {
    console.log(sortBy);
    this._sortBy = sortBy;
    this.render();
  }

  setFilterByTransplants (transplants) {
    this._transplants = transplants;
    this.render();
  }

  isTicketHidden (ticket) {
    const ticketTransplants = ticket.getTransplantsCount();

    return this._transplants.length === 0 ? false : !ticketTransplants.some(transplantCount => this._transplants.includes(transplantCount));
  }

  sortTickets (ticket1, ticket2) {
    switch (this._sortBy) {
      case 'cheap':
        return ticket1.getPrice() - ticket2.getPrice();
      case 'speed':
        return ticket1.getMinPathDuration() - ticket2.getMinPathDuration();
      default:
        return 0;
    }
  }

  render () {
    this._container.innerText = '';

    const ticketsCollection = this.tickets
      .sort(this.sortTickets)
      .filter(t => !this.isTicketHidden(t))
      .map(t => t.renderOuter());

    // const ticketsCollection = this.tickets.map(t => t.renderOuter(this.isTicketHidden(t)));

    ticketsCollection.forEach(ticketEl => this._container.append(ticketEl));
  }
}

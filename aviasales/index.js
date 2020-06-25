import { getSerchKey, getTickets } from './server.js';
import { Ticket } from './tickets.js';

const ticketsListEl = document.querySelector('.tickets-list');

getSerchKey()
  .then(getTickets)
  .then(function (data) {
    console.log(data.tickets);

    const tickets = data.tickets.map(ticket => new Ticket(ticket));

    ticketsListEl.innerText = '';
    // ticketsListEl.append(...tickets.map(t => t.renderOuter()));

    const ticketsCollection = tickets.map(t => t.renderOuter());

    ticketsCollection.forEach(ticketEl => ticketsListEl.append(ticketEl));

    console.log(tickets);
    console.log(ticketsCollection);
  });

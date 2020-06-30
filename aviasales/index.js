import { getSerchKey, getTickets } from './server.js';
import { TicketList } from './ticketList.js';
import { Transplants } from './transplants.js';
import { TicketSortForm } from './ticketSortForm.js';
// import { CustomEvents } from './events.js';

// const appEvents = new CustomEvents();

// appEvents.addEventListener('change', onChange);

const ticketSortForm = new TicketSortForm({
  selector: '.tickets-switcher',
  sortSelector: '.tickets-switcher__input'
  // onSortChange: onSortChange
});

ticketSortForm.addEventListener('change', onSortChange);

const transplantsFilter = new Transplants({
  selector: '.transplant',
  onChangeTransplants: onChangeTransplants
});

const ticketList = new TicketList({
  selector: '.tickets-list'
});

onChangeTransplants();
onSortChange();

getSerchKey()
  .then(getTickets)
  .then(({ tickets }) => ticketList.setTickets(tickets));

function onChangeTransplants () {
  ticketList.setFilterByTransplants(transplantsFilter.getTransplants());
}

function onSortChange () {
  // appEvents.dispatch('change');
  ticketList.setSorting(ticketSortForm.getCurrentSorting());
}

import { AddAlertForm } from './addAlert.js';

const addAlert = new AddAlertForm({
  selector: '.add-alert',
  dayNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
});

console.log('addAlert', addAlert);

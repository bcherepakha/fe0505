import { AddAlertForm } from './addAlert.js';
import { Alert } from './alert.js';
import { List } from '../Lesson18/list.js';

const DAY_NAMES = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const list = new List({
  selector: '.alert-list'
});

list.render();

const addAlert = new AddAlertForm({
  selector: '.add-alert',
  dayNames: DAY_NAMES,
  onAdd: addAlertHandler
});

console.log('addAlert', addAlert);

function addAlertHandler (alert) {
  console.log('addAlert', alert);
  const alertComponent = new Alert({
    dayNames: DAY_NAMES,
    ...alert,
    component: 'li',
    className: 'alert-list__item',
    onChangeTime: sortAlerts
  });

  list.add(alertComponent);
  sortAlerts();
}

function sortAlerts () {
  const alerts = list.getActiveTask();

  alerts.sort((alert1, alert2) => {
    const diff1 = alert1.getTime() - Date.now();
    const diff2 = alert2.getTime() - Date.now();

    return diff1 - diff2;
  });

  list.render();
}

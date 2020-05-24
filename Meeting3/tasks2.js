// Function Expression
const ask = function(message, yesHandler, noHandler) {
  const response = confirm(message);

  if (response) {
    yesHandler();
  } else {
    noHandler();
  }
}

ask(
    'Все понятно?',
    function() { return console.log('Великолепно!'); },
    () => console.log('Надо бы повторить материал...')
  );

ask(
  'А может не понятно?',
  function() { console.log('Может!'); /* return undefined; */ },
  () => { console.log('Не может...'); /* return undefined; */ }
);

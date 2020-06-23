const formEl = document.querySelector('.login');

formEl.addEventListener('submit', onSubmit);

function onSubmit (event) {
  console.log('submit', event, this);
  event.preventDefault();

  // обработка формы и ее валидация
}

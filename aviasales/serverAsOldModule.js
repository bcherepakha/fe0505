(function (global, moduleName) {
  function getSerchKey () {
    return fetch('https://front-test.beta.aviasales.ru/search')
      .then(function onSuccess (response) {
        return response.json();
      })
      .then(function onSuccess (data) {
        console.log(data);
        // console.log(data.searchId);
        // console.log(text);
        // console.log(JSON.parse(text));
        // console.log(JSON.parse(text).searchId);

        return data.searchId;
      })
      .catch(function onError () {
        console.error('can\'t get search key');
      });
  }

  function getTickets (searchId) {
    return fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
      .then(responce => responce.json())
      .then(function (data) {
        console.log(data);
      })
      .catch(function onError (error) {
        console.error('can\'t get data', error);
      });
  }

  global[moduleName] = {
    getSerchKey,
    getTickets
  };
})(window, 'server');

console.log(window.server);

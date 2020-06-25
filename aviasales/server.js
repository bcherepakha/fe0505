const SERVER_NAME = 'https://front-test.beta.aviasales.ru';
const SERVER_GET_SEARCH_KEY_URL = SERVER_NAME + '/search';

export function getSerchKey () {
  return fetch(SERVER_GET_SEARCH_KEY_URL)
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

export function getTickets (searchId) {
  return fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
    .then(responce => {
      console.log('responce', responce);

      return responce.json();
    })
    // .then(function (data) {
    //   return data;
    // })
    // .then(data => data)
    .catch(function onError (error) {
      console.error('can\'t get data', error);
    });
}

// module.exports = {
//   getTickets,
//   getSerchKey
// };

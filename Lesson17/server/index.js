const ROOT_ENDPOINT = 'https://api.punkapi.com/v2/beers';

export function getBeer (params = {}) {
  const { random, id, ...restParams } = params;
  let endopint;

  if (random) {
    endopint = `${ROOT_ENDPOINT}/random`;
  } else if (id) {
    endopint = `${ROOT_ENDPOINT}/${id}`;
  } else {
    const queryParams = Object.keys(restParams)
      .filter(key => restParams[key])
      .map(key => `${key}=${restParams[key]}`);

    endopint = ROOT_ENDPOINT;

    if (queryParams.length > 0) {
      endopint += `?${queryParams.join('&')}`;
    }
  }

  return fetch(endopint)
    .then(response => response.json());
}

import fetch from 'isomorphic-fetch';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  OPTIONS: '',
};

// export function post(url, data) {
//   return fetch(url, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify(data),
//   }).then(response => response);
// }



// export function post(url, data) {
//   console.log('url:', url);
//   console.log('data:', data);
//   return fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     throw error;
//   });
// }

export function post(url, data) {
  // Log the url and data for debugging purposes
  console.log('url:', url);
  console.log('data:', data);

  // Send the POST request with fetch
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  // If the response is not okay, throw an error with the response status text
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // Otherwise, parse the response body as JSON and return it
    return response.json();
  })
  // If there is an error, log it and rethrow it to propagate it to the caller
  .catch(error => {
    console.error('Error:', error);
    throw error;
  });
}



export function get(url) {
  return fetch(url, {
    method: 'GET',
    headers,
  }).then(response => response.json());
}

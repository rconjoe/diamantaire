import axios from 'axios';

const vraiApiClient = axios.create({
  baseURL: 'http://localhost:3003',
  headers: {
    'x-api-key': process.env['VRAI_SERVER_API_KEY'],
    'Content-type': 'application/json',
  },
});

// const vraiApiClient = axios.create({
//   baseURL: process.env['VRAI_SERVER_BASE_URL'],
//   headers: {
//     'x-api-key': process.env['VRAI_SERVER_API_KEY'],
//     'Content-type': 'application/json',
//   },
// });

export { vraiApiClient };

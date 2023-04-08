import axios from 'axios';

const vraiApiClient = axios.create({
  baseURL: process.env['NODE_ENV'] === 'development' ? 'http://localhost:3003' : process.env['VRAI_SERVER_BASE_URL'],
  headers: {
    'x-api-key': process.env['VRAI_SERVER_API_KEY'],
    'Content-type': 'application/json',
  },
});

export { vraiApiClient };

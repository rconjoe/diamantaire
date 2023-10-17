import axios from 'axios';

// My getBlockProducts fails when this isn't public env variables
const vraiApiClient = axios.create({
  baseURL: process.env['VRAI_SERVER_BASE_URL'],
  headers: {
    'x-api-key': process.env['VRAI_SERVER_API_KEY'],
    'Content-type': 'application/json',
  },
});

export { vraiApiClient };

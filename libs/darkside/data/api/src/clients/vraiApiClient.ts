import axios from 'axios';

const vraiApiClient = axios.create({
  baseURL: process.env['NEXT_PUBLIC_VRAI_SERVER_BASE_URL'],
  headers: {
    'x-api-key': process.env['NEXT_PUBLIC_VRAI_SERVER_API_KEY'],
    'Content-type': 'application/json',
  },
});

export { vraiApiClient };

import axios from 'axios';

const dfApiClient = axios.create({
  baseURL: process.env['DF_SERVER_BASE_URL'],
  headers: {
    'Content-type': 'application/json',
  },
});

export { dfApiClient };

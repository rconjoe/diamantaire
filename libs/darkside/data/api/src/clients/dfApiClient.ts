import axios from 'axios';

const dfApiClient = axios.create({
  baseURL: process.env['DF_SERVER_BASE_URL'],
  headers: {
    // 'x-api-key': process.env['DF_SERVER_BASE_URL'],
    'Content-type': 'application/json',
  },
});

export { dfApiClient };

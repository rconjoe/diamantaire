import axios from 'axios';

export function queryClientApi() {
  let base = process.env['VERCEL_URL'] ? 'https://' + process.env['VERCEL_URL'] : 'http://localhost:4200';

  base = typeof window === 'undefined' ? base : window?.location?.origin;

  return axios.create({
    baseURL: base + '/api',
    headers: {
      'Content-type': 'application/json',
    },
  });
}

import { NextApiResponse } from 'next';

export function setCacheHeader(res: NextApiResponse) {
  res.setHeader('Cache-Control', 's-maxage=86400');
}

export function setCorsHeaders(res: NextApiResponse) {
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // replace this your actual origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );
}

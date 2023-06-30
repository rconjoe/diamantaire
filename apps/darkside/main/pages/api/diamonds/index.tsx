import { vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse<string>) {
  const clientApi = vraiApiClient;

  const query = _req.query as Record<string, string>;

  let search = '';

  if (Object.keys(query).length) {
    search = new URLSearchParams(query).toString();
  }

  const url: string = '/v1/diamonds' + '?' + search;

  try {
    const response = await clientApi.request({ method: 'GET', url });

    const payload = response.data;

    return res.status(200).json(payload);
  } catch (err: any) {
    return res.status(500).json(err);
  }
}

import { vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse<string>) {
  let vraiApiClientURL = '/v1/diamonds';

  const query = _req.query as Record<string, string>;

  const array = Object.keys(query || {});

  vraiApiClientURL += '?' + (array.length ? new URLSearchParams(query).toString() : '');

  let vraiApiClientPayload: any = {};

  try {
    const vraiApiClientResponse = await vraiApiClient.request({ method: 'GET', url: vraiApiClientURL });

    vraiApiClientPayload = vraiApiClientResponse.status === 200 ? vraiApiClientResponse?.data : {};
  } catch (err) {
    vraiApiClientPayload = {};
  }

  const diamond = vraiApiClientPayload?.items;

  return res.status(200).json({ ...diamond });
}

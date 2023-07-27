import { vraiApiClient, dfApiClient } from '@diamantaire/darkside/data/api';
import { NextApiResponse, NextApiRequest } from 'next';

// if lotID in query, fn returns one diamond: {}
// if lotID is not in query, fn returns a list: [] of {}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<string>) {
  let vraiApiClientURL = '/v1/diamonds';

  let dfApiClientURL = '/api/v1/diamonds';

  const query = _req.query as Record<string, string>;

  const array = Object.keys(query || {});

  const id = query?.lotId || null;

  if (id) {
    vraiApiClientURL += '/' + id;
    dfApiClientURL += '/' + id;
  } else {
    // URL path to get a list of dimaonds by filter options
    vraiApiClientURL += '?' + (array.length ? new URLSearchParams(query).toString() : '');
  }

  try {
    const vraiApiClientResponse = await vraiApiClient.request({ method: 'GET', url: vraiApiClientURL });

    const vraiApiClientPayload = vraiApiClientResponse?.data || {};

    if (id) {
      const dfApiClientResponse = await dfApiClient.request({ method: 'GET', url: dfApiClientURL });

      const dfApiClientPayload = dfApiClientResponse?.data || {};

      return res.status(200).json({ ...dfApiClientPayload, ...vraiApiClientPayload });
    }

    return res.status(200).json({ ...vraiApiClientPayload });
  } catch (err: any) {
    return res.status(500).json(err);
  }
}

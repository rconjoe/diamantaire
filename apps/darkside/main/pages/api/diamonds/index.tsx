import { dfApiClient, vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiRequest, NextApiResponse } from 'next';

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

    dfApiClientURL += '/' + id.replace(/\D/g, '');
  } else {
    // URL path to get a list of dimaonds by filter options
    vraiApiClientURL += '?' + (array.length ? new URLSearchParams(query).toString() : '');
  }

  let vraiApiClientPayload: any = {};

  try {
    const vraiApiClientResponse = await vraiApiClient.request({ method: 'GET', url: vraiApiClientURL });

    vraiApiClientPayload = vraiApiClientResponse.status === 200 ? vraiApiClientResponse?.data : {};
  } catch (err) {
    vraiApiClientPayload = {};
  }

  if (id) {
    let dfApiClientPayload: any = {};

    try {
      const dfApiClientResponse = await dfApiClient.request({ method: 'GET', url: dfApiClientURL });

      dfApiClientPayload = dfApiClientResponse?.data || {};
    } catch (err) {
      dfApiClientPayload = {};
    }

    return res.status(200).json({ ...dfApiClientPayload, ...vraiApiClientPayload });
  }

  return res.status(200).json({ ...vraiApiClientPayload });
}

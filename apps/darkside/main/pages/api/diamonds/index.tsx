import { dfApiClient, vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiRequest, NextApiResponse } from 'next';

// if lotID in query, fn returns one diamond: {}
// if lotID is not in query, fn returns a list: [] of {}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<string>) {
  try {
    let vraiApiClientURL = '/v1/diamonds';
    let dfApiClientURL = '/api/v1/diamonds';

    const query = _req.query as Record<string, string>;

    const id = query?.lotId || null;
    const ids = (id && id.split(',').length > 1) || false;
    const view = query?.view || null;
    const handle = query?.handle || null;
    const getAdditionalInfo = query?.withAdditionalInfo === 'true';

    // Get Data from VRAI-DIAMOND-API

    let vraiApiClientPayload: any = {};

    if (ids) {
      vraiApiClientURL = `${vraiApiClientURL}/list/${id}`;
    }

    if (id && !ids) {
      vraiApiClientURL = `${vraiApiClientURL}/${id}`;
    }

    if (handle) {
      vraiApiClientURL = `${vraiApiClientURL}/handle/${handle}`;
    }

    if (!id && !handle) {
      const obj = new URLSearchParams(query);

      obj.delete('view');
      obj.delete('withAdditionalInfo');

      const arr = Object.keys(query || {});
      const search = obj.toString();

      vraiApiClientURL = `${vraiApiClientURL}${getApiRouteFromViewParam(view) ?? ''}?` + (arr.length ? search : '');
    }

    console.log(`😀 vraiApiClientURL`, vraiApiClientURL);

    try {
      const vraiApiClientResponse = await vraiApiClient.request({ method: 'GET', url: vraiApiClientURL });

      vraiApiClientPayload = vraiApiClientResponse.status === 200 ? vraiApiClientResponse?.data : {};
    } catch {
      vraiApiClientPayload = {};
    }

    // Get additional Data from DF-DIAMOND-API

    let dfApiClientPayload: any = {};

    if (vraiApiClientPayload.lotId && getAdditionalInfo) {
      const sanitizedDfApiDiamondId = vraiApiClientPayload.lotId.replace(/\D/g, '');

      dfApiClientURL += '/' + sanitizedDfApiDiamondId;

      try {
        const dfApiClientResponse = await dfApiClient.request({ method: 'GET', url: dfApiClientURL });

        dfApiClientPayload = dfApiClientResponse.status === 200 ? dfApiClientResponse?.data : {};
      } catch {
        dfApiClientPayload = {};
      }
    }

    // Payload

    const payload = { ...dfApiClientPayload, ...vraiApiClientPayload };

    // console.log(`** Diamond API Payload **`, payload);

    return res.status(200).json(payload);
  } catch (err) {
    console.log(`err`, err);

    return res.status(200).json(null);
  }
}

function getApiRouteFromViewParam(viewParam?: string) {
  switch (viewParam) {
    case 'toimoi':
      return '/toimoi';
    case 'pairs':
      return '/pairs';
    default:
      return;
  }
}

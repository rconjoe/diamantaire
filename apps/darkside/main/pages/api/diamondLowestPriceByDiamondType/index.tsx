import { vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse<string>) {
  const diamondType = _req.query.diamondType as string;

  if (!diamondType) {
    return res.status(400).json('Diamond type is required');
  }

  const vraiApiClientURL = `/v1/diamonds/lowestpriced/${encodeURIComponent(diamondType)}`;

  let vraiApiClientPayload: any = {};

  try {
    const vraiApiClientResponse = await vraiApiClient.request({ method: 'GET', url: vraiApiClientURL });

    vraiApiClientPayload = vraiApiClientResponse.status === 200 ? vraiApiClientResponse?.data : {};
  } catch (err) {
    console.error(err);

    return res.status(500).json('Internal Server Error');
  }

  return res.status(200).json(vraiApiClientPayload);
}

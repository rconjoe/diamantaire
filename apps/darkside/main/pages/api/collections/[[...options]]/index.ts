import { vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { slug, options, ...queryParams } = req.query;

  let path = '';

  console.log('QUERY', req.query, slug, options);

  if (options) {
    path = options[0];
  }

  const qParams = new URLSearchParams({
    ...(slug && { slug: slug?.toString() }),
    ...queryParams,
  });

  let baseServicePath = '/v1/products/catalog';

  if (path) {
    baseServicePath = `${baseServicePath}/${path}`;
  }

  baseServicePath = `${baseServicePath}?${qParams.toString()}`;

  console.log('REQ', options, path, baseServicePath);

  try {
    const { data } = await vraiApiClient.get(baseServicePath);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

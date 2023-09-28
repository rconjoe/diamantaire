import { createLogger } from '@diamantaire/darkside/core';
import { vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiRequest, NextApiResponse } from 'next';

const logger = createLogger('api:catalog');

export const collectionsOptionsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await fetchVraiServerData('/v1/products/catalog/options', req.query, res);
};

export const collectionSlugsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await fetchVraiServerData('/v1/products/catalog/slugs', req.query, res);
};

export const collectionProductsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await fetchVraiServerData('/v1/products/catalog', req.query, res);
};

export const collectionCollectionTreeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await fetchVraiServerData(`/v1/products/collection/tree/${req.query.slug}`, {}, res);
};

async function fetchVraiServerData(
  url: string,
  query: Record<string, string | string[] | number> = {},
  res: NextApiResponse,
) {
  const reqUrl = `${url}?${new URLSearchParams(sanatizeQuery(query)).toString()}`;

  try {
    const response = await vraiApiClient.get(reqUrl);

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      throw new Error(`Error fetching data for the product catalog: ${reqUrl}`);
    }
  } catch (error) {
    logger.exception(error);
    res.status(500).json({ error: error['message'] });
  }
}

const sanatizeQuery = (queryObj: Record<string, string | number | string[]>): Record<string, string> => {
  return Object.entries(queryObj).reduce((acc: Record<string, string>, [k, v]) => {
    acc[k] = v.toString();

    return acc;
  }, {});
};

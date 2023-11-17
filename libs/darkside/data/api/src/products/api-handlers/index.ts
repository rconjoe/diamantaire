// import { createLogger } from '@diamantaire/darkside/core';
import { NextApiRequest, NextApiResponse } from 'next';

import { vraiApiClient } from '../../clients';

export const productsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { endpoint } = req.query;

  console.log(endpoint, req.query);

  switch (endpoint) {
    case 'list': {
      productsByListHandler(req, res);

      return;
    }
    case 'slugs': {
      productsBySlugsHandler(req, res);

      return;
    }
    case 'contentids': {
      productsByContentIdsHandler(req, res);

      return;
    }
    default: {
      const errorMsg = `No handler available for API endpoint: ${endpoint}`;

      console.warn(errorMsg);
    }
  }
};

export const productsByContentIdsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { endpoint, ...query } = req.query;

  await fetchVraiServerData('/v1/products/contentids', query as any, res);
};

export const productsBySlugsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { endpoint, ...query } = req.query;

  await fetchVraiServerData('/v1/products/slugs', query as any, res);
};

export const productsByListHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { endpoint, ...query } = req.query;

  await fetchVraiServerData('/v1/products/list', query as any, res);
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
    // logger.exception(error);
    console.log(error);
    res.status(500).json({ error: error['message'] });
  }
}

const sanatizeQuery = (queryObj: Record<string, string | number | string[]>): Record<string, string> => {
  return Object.entries(queryObj).reduce((acc: Record<string, string>, [k, v]) => {
    acc[k] = v.toString();

    return acc;
  }, {});
};

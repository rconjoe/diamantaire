// import { createLogger } from '@diamantaire/darkside/core';
import { NextApiRequest, NextApiResponse } from 'next';

import { vraiApiClient, shopifyAdminRestApi } from '../../clients';

export const productsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { endpoint } = req.query;

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
    case 'inventory': {
      productVariantInventoryHandler(req, res);

      return;
    }
    case 'filter': {
      filterProductHandler(req, res);

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

export const productVariantInventoryHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const LOCATION_IDS = [
    6986563650, // 731 S Spring St
  ]
  const { variantId } = req.query;

  try {
   
    // Get variant inventory_item_id
    const variantResponse = await shopifyAdminRestApi(
      `/variants/${variantId}.json?fields=inventory_item_id,inventory_policy`,
    );

    // Inventory Level
    // https://shopify.dev/docs/api/admin-rest/2024-01/resources/inventorylevel
    const inventoryItemId = variantResponse.variant.inventory_item_id;
    const inventoryLevels = await shopifyAdminRestApi(
      `/inventory_levels.json?location_ids=${LOCATION_IDS.join(',')}&inventory_item_ids=${inventoryItemId}`,
    );

    const inventoryData = inventoryLevels.inventory_levels.find(i => i.inventory_item_id === inventoryItemId);
    const inventoryQuantity = inventoryData?.available ?? 1;
    
    res.status(200).json({
      inventoryQuantity,
      inventoryPolicy: variantResponse?.variant?.inventory_policy,
    });
  } catch(e) {
    // Assume it is in stock if request fails
    res.status(200).json({ inventoryQuantity: 1 });
  }
};

export const filterProductHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { endpoint, ...query } = req.query;

  await fetchVraiServerData('/v1/products/catalog', query as any, res);
}

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
      throw new Error(`Error fetching data: ${reqUrl}`);
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

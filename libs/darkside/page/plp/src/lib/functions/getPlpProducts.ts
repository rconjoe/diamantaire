import { setApiRouteCacheHeader, vraiApiClient } from '@diamantaire/darkside/data/api';
import { captureException } from '@sentry/nextjs';
import { NextApiResponse } from 'next';

type plpProductsOptionsProps = {
  slug: string;
  category: string;
  locale: string;
};

export default async function getPlpProducts(options: plpProductsOptionsProps, res: NextApiResponse) {
  console.log(options);
  setApiRouteCacheHeader(res);

  // sanitize options
  const validParams = ['category', 'slug', 'locale', 'metal', 'diamondType', 'priceMin', 'priceMax', 'style', 'subStyle', 'sortBy', 'sortOrder', 'limit', 'page']
  const params = Object.entries(options).reduce((acc, [key, value]) => {
    if (validParams.includes(key)) {
      acc[key] = value;
    }

    return acc;
  }, {}) 

  const qParams = new URLSearchParams(params)?.toString();

  let response;

  const reqUrl = `/v1/products/plp?${qParams}`;

  try {
    response = await vraiApiClient.get(reqUrl);
    if (response.status !== 200) {
      captureException(`getPlpProducts: ${response.status} : ${JSON.stringify(response)}`);

      return null;
    }

    return response.data;
  } catch (error) {
    captureException(`getPlpProducts ERROR: ${JSON.stringify(error)}`);

    return null;
  }
}

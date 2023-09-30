import { setApiRouteCacheHeader, vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiResponse } from 'next';

type GetPlpProductsOptions = {
  slug: string;
  category: string;
  locale: string;
};

export default async function getPlpProducts(options: GetPlpProductsOptions, res: NextApiResponse) {
  setApiRouteCacheHeader(res);
  const qParams = new URLSearchParams(options).toString();

  console.log('xxx', qParams);

  let response;
  const reqUrl = `/v1/products/plp?${qParams}`;

  try {
    response = await vraiApiClient.get(reqUrl);
  } catch (error) {
    console.log({ getPlpError: error });
  }

  return response.data;
}

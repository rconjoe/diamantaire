import { setApiRouteCacheHeader, vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiResponse } from 'next';

type GetBlockProductsOptions = {
  apiUrl: string;
};

export default async function getBlockProducts(options: GetBlockProductsOptions, res: NextApiResponse) {
  setApiRouteCacheHeader(res);

  const { apiUrl } = options;

  let response;

  try {
    response = await vraiApiClient.get(apiUrl);
  } catch (error) {
    console.log({ getBlockProducts: error });
  }

  return response?.data;
}

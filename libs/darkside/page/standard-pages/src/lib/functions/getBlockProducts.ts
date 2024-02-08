import { setApiRouteCacheHeader, vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiResponse } from 'next';

type GetBlockProductsOptions = {
  apiUrl: string;
  locale: string;
};

export default async function getBlockProducts(options: GetBlockProductsOptions, res: NextApiResponse) {
  setApiRouteCacheHeader(res);

  const { apiUrl, locale } = options;

  const endpoint = `${apiUrl}&locale=${locale}`;

  let response;

  try {
    response = await vraiApiClient.get(endpoint);
  } catch (error) {
    console.log({ getBlockProducts: error });
  }

  return response?.data;
}

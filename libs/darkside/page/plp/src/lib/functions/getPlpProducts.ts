import { vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiResponse } from 'next';

type plpProductsOptionsProps = {
  slug: string;
  category: string;
  locale: string;
};

export default async function getPlpProducts(options: plpProductsOptionsProps, res: NextApiResponse) {
  setApiRouteCacheHeader(res);

  const qParams = new URLSearchParams(options)?.toString();

  let response;

  const reqUrl = `/v1/products/plp?${qParams}`;

  try {
    response = await vraiApiClient.get(reqUrl);
  } catch (error) {
    console.log({ getPlpError: error });
  }
  console.log('reqUrlyyyy', response);

  return response.data;
}

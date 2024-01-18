import { setApiRouteCacheHeader, vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiResponse } from 'next';

type plpProductsOptionsProps = {
  ids: string;
  locale: string;
};

export default async function getPlpProductsByIds(options: plpProductsOptionsProps, res: NextApiResponse) {
  setApiRouteCacheHeader(res);

  const qParams = new URLSearchParams(options)?.toString();

  let response;

  const reqUrl = `/v1/products/list-items?${qParams}`;

  try {
    response = await vraiApiClient.get(reqUrl);
  } catch (error) {
    console.log({ getPlpProductsByIdsError: error });
  }

  return response.data;
}

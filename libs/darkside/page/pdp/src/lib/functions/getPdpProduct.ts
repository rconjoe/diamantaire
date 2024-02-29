import { setApiRouteCacheHeader, vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiResponse } from 'next';

type GetPdpProductOptions = {
  collectionSlug: string;
  id: string;
  locale: string;
};

export default async function getPdpProduct(options: GetPdpProductOptions, res: NextApiResponse) {
  setApiRouteCacheHeader(res);
  const qParams = new URLSearchParams(options).toString();

  console.log('q params', qParams);

  let response;
  const reqUrl = `/v1/products?${qParams}`;

  console.log({ reqUrlxxx: reqUrl });

  try {
    response = await vraiApiClient.get(reqUrl);
    console.log('rezzzz', response.data);
  } catch (error) {
    console.log({ getPlpError: error });
  }

  return response.data;
}

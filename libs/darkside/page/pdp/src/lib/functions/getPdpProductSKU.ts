import { setApiRouteCacheHeader, vraiApiClient } from '@diamantaire/darkside/data/api';
import { NextApiResponse } from 'next';

type GetPdpProdcutSkuOptions = {
    collectionSlug: string
};

export default async function getPdpProductSKU({ collectionSlug }: GetPdpProdcutSkuOptions, res: NextApiResponse) {
    setApiRouteCacheHeader(res);
    
    let response = {
        data: []
    };
    const reqUrl = `/v1/products/collection/sku/${collectionSlug}`;

    try {
      response = await vraiApiClient.get(reqUrl);
    } catch (error) {
      console.log({ getPlpError: error });
    }

    return response.data;
}
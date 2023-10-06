import {
  STANDARD_PAGE_BY_SLUG,
  LIST_PAGE_DATO_SERVER_QUERY,
  setApiRouteCacheHeader,
  queryDatoGQL,
} from '@diamantaire/darkside/data/api';
import type { NextApiRequest, NextApiResponse } from 'next';

type ErrorData = {
  message: string;
};

const routeHandlers = {
  standard: getStandardPageData,
  plpssr: getPlpSsrPageData,
  plp: getPlpPageData,
  pdp: getPdpPageData,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown | ErrorData>) {
  setApiRouteCacheHeader(res);
  const { type } = req.query;
  const routeHandler = routeHandlers[type.toString()];

  if (!routeHandler) {
    return res.status(400).json({ message: `Invalid template type: ${type}` });
  }

  try {
    const response = await routeHandler(req, res);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function getStandardPageData(req: NextApiRequest) {
  const { query } = req;
  const locale = query?.locale?.toString();
  const slug = query?.slug?.toString();

  if (!slug) {
    throw new Error('Get Standard Page: Slug is required');
  }

  const response = await queryDatoGQL({ query: STANDARD_PAGE_BY_SLUG, variables: { locale, slug } });

  return response;
}

async function getPlpSsrPageData(req: NextApiRequest) {
  const { query } = req;
  const locale = query?.locale?.toString();
  const slug = query?.slug?.toString();
  const category = query?.category?.toString();

  if (!slug || !category) {
    throw new Error('Get PLP Page: Slug and category are required');
  }

  try {
    const response = await queryDatoGQL({ query: LIST_PAGE_DATO_SERVER_QUERY, variables: { slug, category, locale } });

    return response;
  } catch {
    return null;
  }
}

async function getPlpPageData(req: NextApiRequest) {
  const { query } = req;
  const locale = query?.locale?.toString();
  const slug = query?.slug?.toString();
  const category = query?.category?.toString();

  if (!slug || !category) {
    throw new Error('Get PLP Page: Slug and category are required');
  }

  const response = await queryDatoGQL({ query: STANDARD_PAGE_BY_SLUG, variables: { locale } });

  return response;
}

async function getPdpPageData(req: NextApiRequest) {
  const { query } = req;
  const locale = query?.locale?.toString();
  const collectionSlug = query?.collectionSlug?.toString();
  const productSlug = query?.productSlug?.toString();

  if (!collectionSlug || !productSlug) {
    throw new Error('Get PDP Page: Collection slug and product slug are required');
  }
  const response = await queryDatoGQL({ query: STANDARD_PAGE_BY_SLUG, variables: { locale } });

  return response;
}

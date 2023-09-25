import { setApiRouteCacheHeader, queryDatoGQL, GLOBAL_TEMPLATE_QUERY } from '@diamantaire/darkside/data/api';
import type { NextApiRequest, NextApiResponse } from 'next';

type ErrorData = {
  message: string;
};

const routeHandlers = {
  global: getGlobalTemplateData,
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

async function getGlobalTemplateData(req: NextApiRequest) {
  const { query } = req;
  const locale = query?.locale?.toString();
  const response = await queryDatoGQL({ query: GLOBAL_TEMPLATE_QUERY, variables: { locale } });

  return response;
}

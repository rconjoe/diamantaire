import { shopifyAdminApiClient } from '@diamantaire/darkside/data/api';
import type { NextApiRequest, NextApiResponse } from 'next';

const CREATE_DRAFT_ORDER_MUTATION = `
  mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        id
        invoiceUrl
        createdAt
        name
      }
      userErrors {
        field
        message
      }
    }
  }
`;

interface DraftOrder {
  id: string;
  invoiceUrl: string;
}

interface UserError {
  field: string[];
  message: string;
}

interface DraftOrderCreateResponse {
  draftOrderCreate: {
    draftOrder: DraftOrder;
    userErrors: UserError[];
  };
}

async function handleCreateDraftOrder(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const variables = req.body;

    const data: DraftOrderCreateResponse = await shopifyAdminApiClient.request(CREATE_DRAFT_ORDER_MUTATION, variables);

    return res.status(200).json(data.draftOrderCreate.draftOrder);
  } catch (error) {
    console.error('Error creating draft order:', error);

    return res.status(500).json({ error: 'Failed to create draft order' });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const params = query.shopify as string[];

  if (params.length > 0) {
    const action = params[0];

    switch (action) {
      case 'create-draft-order':
        return handleCreateDraftOrder(req, res);
      default:
        return res.status(404).json({ error: 'Not found' });
    }
  } else {
    return res.status(400).json({ error: 'Bad request' });
  }
}

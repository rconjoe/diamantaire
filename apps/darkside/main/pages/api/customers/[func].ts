import { accountFunctions } from '@diamantaire/darkside/page/accounts';

export default async function handler(req, res) {
  try {
    const { body, method, query } = req;

    if (method !== 'POST' && method !== 'OPTIONS') return res.status(400).json({ error: 'not allowed' });

    if (!body) return res.status(400).json({ error: 'missing body' });

    const { func } = query;

    if (!func) return res.status(400).json({ error: 'missing function' });
    const fn = accountFunctions[func];

    if (!fn) return res.status(400).json({ error: "function doesn't exist" });
    const { payload } = body;

    if (!payload) return res.status(400).json({ error: 'missing payload' });
    const data = await fn(payload);

    res.status(200).json(data);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error });
  }
}

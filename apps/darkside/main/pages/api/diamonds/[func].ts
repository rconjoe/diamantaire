import { diamondFunctions } from '@diamantaire/darkside/page/diamonds';

export default async function handler(req, res) {
  try {
    const { method, query } = req;

    if (method !== 'GET' && method !== 'OPTIONS') return res.status(400).json({ error: 'not allowed' });

    const { func, ...qParams } = query;

    if (!func) return res.status(400).json({ error: 'missing function' });
    const fn = diamondFunctions[func];

    if (!fn) return res.status(400).json({ error: "function doesn't exist" });

    if (!qParams) return res.status(400).json({ error: 'missing payload' });
    const data = await fn(qParams);

    res.status(200).json(data);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error });
  }
}

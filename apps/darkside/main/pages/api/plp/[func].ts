import { plpFunctions } from '@diamantaire/darkside/page/plp';

export default async function handler(req, res) {
  try {
    const { method, query } = req;

    if (method !== 'GET' && method !== 'OPTIONS') return res.status(400).json({ error: 'not allowed' });

    const { func, ...qParams } = query;

    console.log('issss the init params?', func, ...qParams);

    if (!func) return res.status(400).json({ error: 'missing function' });
    const fn = plpFunctions[func];

    console.log('issss the function being called?');

    if (!fn) return res.status(400).json({ error: "function doesn't exist" });

    console.log('issss the function happening?');
    if (!qParams) return res.status(400).json({ error: 'missing payload' });
    const data = await fn(qParams, res);

    console.log('issss data being returned?', data);

    res.status(200).json(data);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error });
  }
}

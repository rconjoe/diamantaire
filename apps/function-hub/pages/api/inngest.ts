import { serve } from 'inngest/next';

import { inngest, functions } from '../../inngest';

export default serve(inngest, functions, {
  // signingKey: process.env.INNGEST_SIGNING_KEY,
});

import { Inngest } from 'inngest';
import { serve } from 'inngest/next';

export const inngest = new Inngest({ name: 'function-hub' });

export default serve(inngest, []);

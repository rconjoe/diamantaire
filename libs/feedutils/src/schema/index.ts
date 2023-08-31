import * as S from '@effect/schema/Schema';

import { Endpoint, makePathResolver } from '../util';

export const SlugIngestEndpoint = {
  path: makePathResolver(S.struct({}), () => '/api/feed/slug-ingest'),
  methods: {
    GET: {
      auth: false,
      response: S.struct({
        message: S.string,
      }),
    },
  },
} as const satisfies Endpoint;

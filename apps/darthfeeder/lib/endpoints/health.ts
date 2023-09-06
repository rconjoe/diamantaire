import * as S from '@effect/schema/Schema';

import { Endpoint, makePathResolver } from '../util';

export const HealthEndpoint = {
  path: makePathResolver(S.struct({}), () => '/api/health'),
  methods: {
    GET: {
      auth: false,
      response: S.struct({
        message: S.string,
      }),
    },
  },
} as const satisfies Endpoint;

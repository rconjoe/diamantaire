import { Endpoint, makePathResolver } from '@diamantaire/lapidary';
import * as S from '@effect/schema/Schema';

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
